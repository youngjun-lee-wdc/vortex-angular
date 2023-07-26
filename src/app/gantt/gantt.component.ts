import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { gantt } from 'dhtmlx-gantt';
import { LightboxComponent } from '../lightbox/lightbox.component';


@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'gantt',
    styleUrls: ['./gantt.component.css'],
    templateUrl : './gantt.component.html',
})

export class GanttComponent implements OnInit, OnDestroy {
    @ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;
    // @ViewChildren("LightboxComponent") 
    @ViewChild(LightboxComponent) customLightBox: LightboxComponent

    // public Lightbox: QueryList<LightboxComponent>
    // private customLightBox : LightboxComponent
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
    
    
        gantt.config.lightbox = false
        // allows tasks to be shown linearly rather than in a tree hierarchy format going in diagonal direction
        gantt.locale.labels['section_split'] = "Display";
        gantt.config.grid_resize = true
        gantt.config.server_utc = true;
        // gantt.config.lightbox.project_sections = [];
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
        gantt.locale.labels['section_test'] = 'Test Suite';
        gantt.locale.labels['section_test_plan_writein'] = 'Specify New Test Plan';
        gantt.locale.labels['section_test_plan_dropdown'] = 'Test Plan';
        gantt.locale.labels['section_FW_version'] = 'Firmware Version';
        gantt.templates.task_class  = function(start, end, task){
            if (task.text.includes("VM-")){ 
              switch (task['status']){
              case "Not Started":
                return "not_started";
                break;
              case "Requested":
                return "requested";
                break;
              case "Running":
                return "running";
                break;
              case "Completed":
                return "completed";
                break;
              case "VICE Processing Error":
                return "viceprocerror";
                break;
              }
            }else if(task.text.includes("DEV-offline")){
              return "devoffline";
            }
            return ""
          };

          

          
    }
    
    callLightbox(taskId: any){
      this.customLightBox.showLightbox(taskId)
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


        gantt.attachEvent("onTaskClick", (id) =>{
          this.callLightbox(id)
        })
        gantt.init(this.ganttContainer.nativeElement);
        gantt.showDate(new Date())

        gantt.load("http://localhost:3000/data")
        const dp = gantt.createDataProcessor({
            // url: "http://137.135.48.130:3000/data",
            url: "http://localhost:3000/data",
            mode: "REST"
        });

        dp.attachEvent("onAfterUpdate", function(id: string | number, action: any, tid: string | number, response: { status: string; }){  
            var exp = 4000;
            let i;
            console.log("here")
            switch (action){
              case "TaskAdded":
                if(response.status === "Success"){
                  
                  gantt.changeTaskId(id, tid);
                  gantt.showDate(new Date(Date.now() - ( 1* 3600 * 1000 * 24))); 
      
                  let task_tmp = gantt.getTask(tid);
                  var s = gantt.getChildren(task_tmp.parent!);
                  var siblings = []
                  for(i = 0; i < s.length; i++){
                    var sib_id = s[i].substring(3);
                    sib_id = parseInt(sib_id)
                    if (!isNaN(sib_id)) { 
                      siblings.push(sib_id)
                    }
                  }
                  siblings.sort(function(a, b){return a-b})
                  if(siblings.length > 1){
                    gantt.addLink({
                        id:1000000,
                        source: "vm-" + siblings[siblings.length - 2].toString(),
                        target: "vm-" + siblings[siblings.length - 1].toString(),
                        type:gantt.config.links.finish_to_start
                    });
                  }
                  //console.log('Task ' + response.tid + ' was added ' + response.status)
                  
                } else{
                  gantt.message({
                    type:"error", 
                    text:"Unknown Error <br> Task was not added!",
                    expire:exp
                  });
                }
                break;
              case "LinkAdded":
                if(response.status === "Success"){
                  gantt.changeLinkId(id, tid);
                  //console.log('Link ' + response.tid + ' was added ' + response.status)
                } else{
                  gantt.message({
                    type:"error", 
                    text:"Unknown Error <br> Link was not added!",
                    expire:exp
                  });
                }
                break;
              case "TaskUpdated":
                if(response.status === "Success"){
                  //console.log('Task ' + response.tid + ' was updated ' + response.status)
                } else{
                  gantt.message({
                    type:"error", 
                    text:"Unknown Error <br> Task was not updated!",
                    expire:exp
                  });
                }
                break;
              case "LinkUpdated":
                if(response.status === "Success"){
                  //console.log('Link ' + response.tid + ' was updated ' + response.status)
                } else{
                  gantt.message({
                    type:"error", 
                    text:"Unknown Error <br> Link was not updated!",
                    expire:exp
                  });
                }
                break;
              case "TaskDeleted":
                if(response.status === "Success"){
                  //console.log('Task ' + response.tid + ' was deleted ' + response.status)
                } else{
                  gantt.message({
                    type:"error", 
                    text:"Unknown Error <br> Task was not deleted!",
                    expire:exp
                  });
                }
                break;
              case "LinkDeleted":
                if(response.status === "Success"){
                  //console.log('Link ' + response.tid + ' was deleted ' + response.status)
                } else{
                  gantt.message({
                    type:"error", 
                    text:"Unknown Error <br> Link was not deleted!",
                    expire:exp
                  });
                }
                break;
              default:     
              }
        });
      
        dp.init(gantt);
    }


    ngAfterViewInit(){
      // gantt.attachEvent("onTaskClick", (id)=>{
        // this.Lightbox.showLightbox(id)
      // }) 
    }

    // ngAfterContentInit(){
      // gantt.attachEvent("onTaskClick", (id)=>{
        // this.customLightbox.showLightbox(id)
      // }) 
    // }

    ngOnDestroy(): void{
        gantt.destructor();
    }
}