import React, { Component } from 'react';
import MainPageHeader from './components/Header';
import NavigationHeader from './components/Navigation/Header';
import NavigationProblems from './components/Navigation/Problems';
import MainPageFooter from './components/Footer';
import NotFound from '../NotFound';
import home from './styles.css';
import { NotificationContainer } from 'react-notifications';
import { alertWarning } from '../../scripts/alert';
import Locales from '../../strings';
import axios from 'axios';
import ModalContainer, { CONFIRMATION, PALETTE_CHOOSER, ADD_PROBLEM_SET, ADD_PROBLEMS, SHARE_NEW_SET, EDIT_PROBLEM } from '../../components/ModalContainer';
import { SERVER_URL, FRONTEND_URL } from '../../config';

const mathLive = DEBUG_MODE ? require('../../../mathlive/src/mathlive.js')
    : require('../../lib/mathlivedist/mathlive.js');

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            set: {
                problems: [],
                editCode: null,
                sharecode: null
            },
            activeModals: [],
            allowedPalettes: [],
            theActiveMathField: null,
            tempPalettes: [],
            newSetSharecode: "",
            notFound: false
        }

        this.toggleModals = this.toggleModals.bind(this);
        this.addProblem = this.addProblem.bind(this);
        this.saveProblems = this.saveProblems.bind(this);
        this.deleteProblem = this.deleteProblem.bind(this);
        this.editProblem = this.editProblem.bind(this);
        this.updatePositions = this.updatePositions.bind(this);
        this.addProblemSet = this.addProblemSet.bind(this);
        this.progressToAddingProblems = this.progressToAddingProblems.bind(this);
        this.saveProblemSet = this.saveProblemSet.bind(this);
        this.finishEditing = this.finishEditing.bind(this);
    }

    componentDidMount() {
        var path;
        if (this.props.match.params.action === "view") {
            path = `${SERVER_URL}/problemSet/revision/${this.props.match.params.code}`
        } else {
            path = `${SERVER_URL}/problemSet/${this.props.match.params.code}/`
        }

        axios.get(path)
            .then(response => {
                if (response.status != 200) {
                    this.setState({notFound: true});
                }
                var orderedProblems = this.orderProblems(response.data.problems);
                this.setState({
                    set: {
                        problems: orderedProblems,
                        editCode: response.data.editCode,
                        sharecode: response.data.shareCode
                    }
                });
            }).catch((error) => {
                this.setState({notFound: true});
            });
        mathLive.renderMathInDocument();
    }

    orderProblems(problems) {
        return problems.map((problem, i) => {
            problem.position = i;
            return problem;
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.set !== prevState.set || this.state.allowedPalettes !== prevState.allowedPalettes
            || this.state.tempPalettes !== prevState.tempPalettes
            || this.state.newSetSharecode !== prevState.newSetSharecode || this.state.activeModals !== prevState.activeModals)
            mathLive.renderMathInDocument();
    }

    toggleModals(modals, index) {
        var oldModals = this.state.activeModals;
        for (var modal of modals) {
            if (this.state.activeModals.indexOf(modal) != -1) {
                oldModals = oldModals.filter(e => e !== modal);
            } else {
                if (modal == CONFIRMATION) {
                    this.setState({
                        problemToDeleteIndex: index
                    });
                } else if (modal == EDIT_PROBLEM) {
                    this.setState({
                        problemToEditIndex: index,
                        problemToEdit: this.state.set.problems[index]
                    });
                }
                oldModals.push(modal);
            }
        }
        this.setState({ activeModals: oldModals });
    }

    validateProblem(text, image) {
        var message;
        if (text === "" || $.trim(text).length === 0) {
            if (this.state.theActiveMathField.latex() === "" && image === null) {
                message = Locales.strings.no_problem_equation_or_image_and_title_warning;
            } else {
                message = Locales.strings.no_problem_title_warning;
            }
        } else if (this.state.theActiveMathField.latex() === "" && image === null) {
            message = Locales.strings.no_problem_equation_or_image_warning;
        }

        if (message) {
            alertWarning(message, Locales.strings.warning);
            setTimeout(function () {
                $('#mathAnnotation').focus();
            }, 6000);
            return false;
        }
        return true;
    }

    addProblem(imageData, text, index) {
        if (!this.validateProblem(text, imageData)) {
            return;
        }

        let problems = this.state.set.problems;
        let mathContent = this.state.theActiveMathField;
        let annotation = text;
        problems.push({ "text": mathContent.latex(), "title": annotation, "scratchpad": imageData, "position": index });

        mathContent.latex("$$$$");
        this.setState({
            theActiveMathField: mathContent
        });
        this.saveProblems(problems);
        
        mathLive.renderMathInDocument();
        this.scrollToBottom();
    }

    scrollToBottom() {
        try {
            document.querySelector("#container").scrollTo(0, document.querySelector("#container").scrollHeight);
        } catch(e) {
            console.log("scrollTo method not supported");
        }
    }

    saveProblems(problems) {
        var oldSet = this.state.set;
        oldSet.problems = problems;

        axios.put(`${SERVER_URL}/problemSet/${this.state.set.editCode}`, oldSet)
            .then(response => {
                this.setState({
                    set: {
                        problems: response.data.problems,
                        editCode: response.data.editCode,
                        sharecode: response.data.shareCode
                    }
                });
            });
    }

    deleteProblem() {
        var oldSet = this.state.set;
        oldSet.problems.splice(this.state.problemToDeleteIndex, 1);
        axios.put(`${SERVER_URL}/problemSet/${this.state.set.editCode}`, oldSet)
            .then(response => {
                this.setState({
                    set: {
                        problems: response.data.problems,
                        editCode: response.data.editCode,
                        sharecode: response.data.shareCode
                    }
                });
            });

        setTimeout(function () {
            mathLive.renderMathInDocument();
        }.bind(this), 200);
        this.toggleModals([CONFIRMATION]);
    }

    editProblem(imageData, title) {
        if (!this.validateProblem(title, imageData)) {
            return;
        }
        var oldSet = this.state.set;
        oldSet.problems[this.state.problemToEditIndex].title = title;
        oldSet.problems[this.state.problemToEditIndex].scratchpad = imageData;
        oldSet.problems[this.state.problemToEditIndex].text = this.state.theActiveMathField.latex();

        axios.put(`${SERVER_URL}/problemSet/${this.state.set.editCode}`, oldSet)
            .then(response => {
                this.setState({
                    set: {
                        problems: response.data.problems,
                        editCode: response.data.editCode,
                        sharecode: response.data.shareCode
                    }
                });
            });

        setTimeout(function () {
            mathLive.renderMathInDocument();
        }.bind(this), 200);
        this.toggleModals([EDIT_PROBLEM]);
    }

    updatePositions(problems) {
        problems.forEach(function (problem, i) {
            problem.position = i;
        })
        var set = this.state.set;
        set.problems = problems;
        this.setState({ set });
    }

    addProblemSet() {
        this.toggleModals([PALETTE_CHOOSER]);
    }

    progressToAddingProblems(palettes) {
        if (palettes.length == 0) {
            alertWarning(Locales.strings.no_palettes_chosen_warning, Locales.strings.warning);
            return;
        }
        this.setState({ tempPalettes: palettes });
        this.toggleModals([PALETTE_CHOOSER, ADD_PROBLEM_SET]);
    }

    saveProblemSet() {
        var set = {
            palettes: this.state.tempPalettes
        };

        axios.post(`${SERVER_URL}/problemSet/`, set)
            .then(response => {
                this.setState({
                    newSetSharecode: response.data.shareCode
                })
            });
        this.toggleModals([ADD_PROBLEM_SET, SHARE_NEW_SET]);
    }

    finishEditing() {
        this.props.history.push(`/problemSet/view/${this.state.set.sharecode}`);
    }

    render() {
        if (this.state.notFound) {
            return <NotFound />
        }
        return (
            <div className={home.mainWrapper}>
                <NotificationContainer />
                <MainPageHeader editing={this.props.match.params.action == 'edit'} history={this.props.history} shareCallback={this.toggleModals}
                    addProblemSetCallback={this.addProblemSet} finishEditing={this.finishEditing} editCode={this.state.set.editCode}/>
                <ModalContainer 
                    activeModals={this.state.activeModals}
                    toggleModals={this.toggleModals}
                    progressToAddingProblems={this.progressToAddingProblems} deleteProblem={this.deleteProblem}
                    shareLink={FRONTEND_URL + '/problemSet/view/' + this.state.set.sharecode}
                    newSetShareLink={FRONTEND_URL + '/problemSet/view/' + this.state.newSetSharecode}
                    activateMathField={theActiveMathField => this.setState({ theActiveMathField })}
                    theActiveMathField={this.state.theActiveMathField}
                    addProblemCallback={this.addProblem}
                    problems={this.state.set.problems}
                    saveProblemSet={this.saveProblemSet}
                    saveProblems={this.saveProblems}
                    problemToEdit={this.state.problemToEdit}
                    editProblemCallback={this.editProblem} />
                <nav id="LeftNavigation" className={home.leftNavigation} aria-labelledby="LeftNavigationHeader">
                    <NavigationHeader />
                    <NavigationProblems problems={this.state.set.problems} editing={this.props.match.params.action == 'edit'}
                        activateModals={this.toggleModals} updatePositions={this.updatePositions} />
                </nav>
                <MainPageFooter />
            </div>
        )
    }
}
