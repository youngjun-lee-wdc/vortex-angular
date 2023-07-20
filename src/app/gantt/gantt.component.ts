import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { TaskService } from '../services/task.service';
import { LinkService } from '../services/link.service';
import { gantt } from 'dhtmlx-gantt';


@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'gantt',
    styleUrls: ['./gantt.component.css'],
    providers: [TaskService, LinkService],
    templateUrl : './gantt.component.html',
})

export class GanttComponent implements OnInit, OnDestroy {
    @ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;

    constructor(){
        gantt.config.date_format = '%Y-%m-%d %H:%i';
        gantt.config.open_tree_initially = true;
        gantt.config.duration_unit = "minute";
        gantt.config.duration_step = 1; 
        gantt.config.date_grid = "%Y-%m-%d %H:%i";
        gantt.config.xml_date = "%Y-%m-%d %H:%i";
        gantt.config.round_dnd_dates = false;
        gantt.config.order_branch = true;
        gantt.config.order_branch_free = true;
        gantt.config.branch_loading = true;
        gantt.config.drag_progress = false;
        gantt.config.grid_width = 400;
        gantt.config.time_step = 1;
        gantt.config.time_picker = "%i";
        gantt.config.min_column_width = 120; 
        gantt.config.initial_scroll = false;
        gantt.config.sort = true;
        gantt.config.smart_scales = true;
        gantt.config.smart_rendering = true;
        gantt.config.wheel_scroll_sensitivity = 0.2;
        // gantt.config.scroll_size = ;  
        gantt.config.buttons_left = ["gantt_save_btn"];   
        gantt.config.buttons_right = ["gantt_delete_btn", "gantt_cancel_btn"];
        gantt.config.drag_timeline = {
            ignore:".gantt_task_line, .gantt_task_link",
            useKey: false
        };
         
        gantt.locale.labels.icon_save = "Ok";  
        gantt.config.show_task_cells = false;
        gantt.config.auto_types = true;
        gantt.config.auto_scheduling = true;
        gantt.config.auto_scheduling_compatibility = true;
        gantt.config.static_background = true;
        gantt.config.columns=[
            { 
                name:"text", label:"Tests",  tree:true , width: "*",
                template: (task) => {
                    if (task.text.includes("VM-")){
                        return "<div style = 'direction:rtl; text-align: center; overflow: hidden'>"+task.text+"</div>"
                    }
                    return task.text
                }
            },
            {name:"add", label:"" },
        ];
    
    
        
        // allows tasks to be shown linearly rather than in a tree hierarchy format going in diagonal direction
        gantt.locale.labels['section_split'] = "Display";
        gantt.config.grid_resize = true
        gantt.config.server_utc = true;
        gantt.config.lightbox.project_sections = [];
        gantt.config.open_split_tasks = false;
        gantt.templates.task_text = function(start, end, task){
            return "<div style = 'direction:rtl; text-align: center; overflow: hidden'>"+task.text+"</div>";
        };
    
        // constant variables to be used in sections like the lightbox sections
        gantt.locale.labels['section_test'] = 'Test Suite';
        gantt.locale.labels['section_test_plan_writein'] = 'Specify New Test Plan';
        gantt.locale.labels['section_test_plan_dropdown'] = 'Test Plan';
        gantt.locale.labels['section_FW_version'] = 'Firmware Version';
    
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
    
        gantt.templates.grid_row_class = ( start, end, task ) => {
            let level = ""
            if (task.$level != 2){
                // returning nested_task allows css to target this class and hide it
                level += "nested_task"
            }
            return level;
          };
    }

    ngOnInit() {
        gantt.plugins({
            auto_scheduling: true,
            tooltip: true,
            drag_timeline: true,
            keyboard_navigation: true,
            marker: true,
            undo: true,
            fullscreen: true,
            export_api: true
        })


        gantt.init(this.ganttContainer.nativeElement);
        gantt.showDate(new Date())

        gantt.load("http://localhost:3000/data")
        const dp = gantt.createDataProcessor({
            // url: "http://137.135.48.130:3000/data",
            url: "http://localhost:3000/data",
            mode: "REST"
        });
        dp.init(gantt);
    }

    ngOnDestroy(): void{
        gantt.destructor();
    }
}