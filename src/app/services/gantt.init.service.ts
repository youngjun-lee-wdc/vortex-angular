import { GanttStatic, Task } from 'dhtmlx-gantt';
import { minutesToTime } from '../HelperFunctions';

export function GanttConfig(gantt: GanttStatic): void{
    gantt.config.date_format = '%Y-%m-%d %H:%i';
    gantt.config.open_tree_initially = true;
    gantt.config.duration_unit = "minute";
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    gantt.config.date_grid = "%Y-%m-%d %H:%i";
    gantt.config.xml_date = "%Y-%m-%d %H:%i";
    gantt.config.round_dnd_dates = false;
    gantt.config.order_branch = true;
    gantt.config.order_branch_free = true;
    gantt.config.drag_progress = false;
    gantt.config.grid_width = 400;
    gantt.config.time_step = 1;
    gantt.config.time_picker = "%i";
    gantt.config.min_column_width = 120; 
    gantt.config.initial_scroll = false;
    gantt.config.sort = true;  
    gantt.locale.labels["gantt_exit_btn"] = "";
    gantt.config.buttons_left = ["gantt_save_btn"];   
    gantt.config.buttons_right = [ "gantt_delete_btn", "gantt_cancel_btn", "gantt_exit_btn"];
    gantt.config.drag_timeline = {
        ignore:".gantt_task_line, .gantt_task_link",
        useKey: false
    };
    
    gantt.locale.labels.icon_save = "Ok";  
    gantt.config.auto_types = true;
    gantt.config.auto_scheduling = true;
    gantt.config.auto_scheduling_compatibility = true;
    // allows tasks to be shown linearly rather than in a tree hierarchy format going in diagonal direction
    // gantt.locale.labels.section_split = "Display";
    gantt.config.open_tree_initially = true;
    gantt.config.server_utc = true;
    // gantt.config.lightbox.project_sections = [];
    gantt.config.open_split_tasks = false;

    // constant variables to be used in sections like the lightbox sections
    // gantt.locale.labels.section_test = 'Test Suite';
    // gantt.locale.labels.section_test_plan_writein = 'Specify New Test Plan';
    // gantt.locale.labels.section_test_plan_dropdown = 'Test Plan';
    // gantt.locale.labels.section_FW_version = 'Firmware Version';

    gantt.templates.tooltip_date_format = (date: Date) => {
        let formatFunc = gantt.date.date_to_str("%Y-%m-%d %H:%i");
        return formatFunc(date);
    };

    gantt.templates.grid_folder = () => {
        return "<div class='gantt_tree_icon'> <fa-icon [icon]=fa-solid fa-database fa-lg'></div>";
    };
  
    gantt.templates.grid_file = () => {
        return "<div class='gantt_tree_icon fa-solid fa-hard-drive fa-lg'></div>";
    };

  
  
}