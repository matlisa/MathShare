import LocalizedStrings from 'react-localization';


class Locales {
    constructor() {
        this.strings = new LocalizedStrings({
        en:{
            my_steps: "My Steps",
            steps: "Steps",
            step: "Step",
            step_after_cleanup: "step, after cleanup",
            cleanup: "(cleanup)",
            edit_this_step: "Edit this Step",
            delete_this_step: "Edit this Step",
            edit: "Edit",
            delete: "Delete",
            math: "math",
            reason: "reason",
            history_data_intro: "Review your work. The trash icon also allows you to delete and rework a prior step.",
            math_input_buttons: "math input buttons",
            speech_recongition_error: "Speech recognition is supported only for Google Chrome",
            start_speaking: "Start Speaking",
            work_area_intro: "Type or edit the equation using your keyboard and the math keys below. \nTry using the cross out, replace, and calc buttons to help show your work.",
            math_editor: "Math editor",
            edit_equation: "edit equation",
            type_math_here: "type math here",
            tts_hint: "Use the microphone button or type to explain your work (required)",
            tts_intro: "Describe your work by typing directly \nor using the microphone to record an explanation of your work (required).",
            tts_hint_add_problem: "Use the microphone button or type to add problem title (required)",
            tts_intro_add_problem: "Describe problem titlw by typing directly \nor using the microphone to record a title of problem (required).",
            done: " Done",
            clear_all: " Clear all",
            save_intro: "Save your work or close out to try again from the beginning.",
            clear_scratchpad: "Clear the scratch pad",
            sketchpad_loading_warning: "Sketchpad library wasn't loaded properly",
            undo_last_action: "Undo Last Action (⌨: shift+backspace)",
            clean_up_and_add_step: "Clean up and add new step",
            clean_up_button_title: "Clean up the cross outs and start a new step (⌨: shift+enter)",
            add_step: " Add step",
            add_step_intro: "Clean-up your work and start a new step.",
            update_step_button_title: "Update the step (⌨: shift+enter)",
            update_step: " Update Step",
            update_step_intro: "Update the step.",
            cancel_edit_button_title: "Cancel edit",
            cancel_edit_step: " Cancel edit",
            cancel_edit_step_intro: "Cancel edit.",
            my_work: "My Work",
            no_description_warning: "Please provide a description of your work.",
            no_problem_title_warning: "Please provide a problem title.",
            warning: 'Warning',
            successfull_update_message: "The step has been updated.",
            problems_to_solve: " Problems to solve ",
            select_a_problem: "Select a problem and try out Benetech's Math Editor (alpha)!",
            getting_started_title: "Getting Started",
            getting_started_equation: "Click here to see an example problem and learn how to use the editor",
            problem_saved_success_message: "Problem saved.",
            success: 'Success',
            header: " Header ",
            problem_sets: "Problem Sets",
            problem_set_1: "Problem Set 01",
            problem_set_2: "Problem Set 02",
            problem_set_3: "Problem Set 03",
            upload: "Upload",
            contact_us: "Contact Us",
            provide_feedback: "Provide Feedback",
            upload_no_file_warning: "Please select a file",
            footer: "Footer",
            idea_logo_alt: "IDEA Logo",
            diagram_center: "DIAGRAM Center",
            is_a: " is a ",
            benetech: "Benetech",
            footer_description: "initiative supported by the U.S. Department of Education, Office of Special Education Programs (Cooperative Agreement #H327B100001). Opinions expressed herein are those of the authors and do not necessarily represent the position of the U.S. Department of Education. Poet™ is a trademark of Beneficent Technology, Inc. This website is copyright © 2012-2017, Beneficent Technology, Inc.",
            loading: "Loading...",
            share: " Share",
            copy: " Copy",
            close: " Close",
            add_problem_title: "Add new Problem",
            add_problem: " Add Problem",
            add_problem_equation: "+",
            save: " Save",
            edit_link_label: "Edit Url: ",
            cancel: " Cancel",
            new_problem: " New Problem",
            add_problems: " Add problem(s) to set",
            hash: "#",
            equation: "Equation",
            annotation: "Annotation",
            share_link: "Share Link: ",
            problem_image: "Problem image",
            share_link: "Share Link: ",
            confirmation_modal_unsaved_title: "You have unsaved changes, do you wish to save?",
            discard_changes: " Discard Changes",
            save_changes: " Save Changes",
            choose_palettes_to_add_equations: "Please choose palettes that you will use to add equations",
            next: "Next",
            save_changes: " Save Changes",
            scratchpad: " Sketch",
            symbols: " Symbols",
            switch_to_sketchpad: "Switch to sketchpad view",
            switch_to_symbols: "Switch to symbols view",
            undo: " Undo"
        },
        es: {
        }
        });
    }
}

export default (new Locales);
