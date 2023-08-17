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
        gantt.config.fit_tasks = true; 
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
        gantt.templates.grid_row_class = ( start, end, task ) => {
            // returning nested_task allows css to target this class and hide it
            return task.$level != 2 ? "nested_task" : ""
          };

        gantt.templates.grid_folder = (task) => { 
          let folderIcon;
          return task.$level == 0 ? "<div class='gantt_tree_icon'><svg xmlns='http://www.w3.org/2000/svg' width='23' height='23' fill='currentColor' class='bi bi-database' viewBox='0 0 16 16'><path d='M4.318 2.687C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4c0-.374.356-.875 1.318-1.313ZM13 5.698V7c0 .374-.356.875-1.318 1.313C10.766 8.729 9.464 9 8 9s-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 5.698ZM14 4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13V4Zm-1 4.698V10c0 .374-.356.875-1.318 1.313C10.766 11.729 9.464 12 8 12s-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 8.698Zm0 3V13c0 .374-.356.875-1.318 1.313C10.766 14.729 9.464 15 8 15s-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13s3.022-.289 4.096-.777c.324-.147.633-.323.904-.525Z'/></svg></div>" : "<div class='gantt_tree_icon'><i class='bi bi-hdd-rack'></i></div>"
        }; 

        gantt.templates.grid_file = () => { return "<div class='gantt_tree_icon'><i class='bi bi-hdd-network'></i></div>"; }
        gantt.templates.grid_open = (task) => { return task.$open ? "<div class='gantt_tree_icon gantt_close'><i class='bi bi-chevron-right'></i></div>" :  "<div class='gantt_tree_icon gantt_open'><i class='bi bi-chevron-down'></i></div>" }

        gantt.locale.labels['section_test'] = 'Test Suite';
        gantt.locale.labels['section_test_plan_writein'] = 'Specify New Test Plan';
        gantt.locale.labels['section_test_plan_dropdown'] = 'Test Plan';
        gantt.locale.labels['section_FW_version'] = 'Firmware Version';
        gantt.templates.task_class  = (start, end, task) => {
            if (task.text.includes("VM-")){ 
              switch (task['status']){
              case "Not Started":
                return "not_started";
              case "Requested":
                return "requested";
              case "Running":
                return "running";
              case "Completed":
                return "completed";
              case "VICE Processing Error":
                return "viceprocerror";
              }
            }else if(task.text.includes("DEV-offline")){
              return "devoffline";
            }
            return ""
          };

          

          
    }
    
    callLightbox(taskId: any, isNewTask: boolean = true){
      this.customLightBox.showLightbox(taskId, isNewTask)
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
        
        gantt.attachEvent("onLoadEnd", function(){ 
          gantt.showDate(new Date(Date.now() - ( 1* 3600 * 1000 * 24))); 
          var tasks = gantt.getTaskByTime();
          var cur_date = new Date()
          cur_date.setDate(cur_date.getDate() - 1)
          for(var i=0; i<tasks.length; i++){
            var task_tmp = tasks[i]
            if(!task_tmp.text.includes("VM-")){
                task_tmp['readonly'] = true
              }
              if(task_tmp.text.includes("DEV-offline")){
                task_tmp['readonly'] = false
              }
              if(task_tmp.start_date! < cur_date){
                task_tmp['readonly'] = true
              }
              if(task_tmp.status !== "Not Started"){
                task_tmp['readonly'] = true
              }
          }
          var date_tmp = Date.now()
          var min_date = gantt.getState().min_date;
          gantt.config.start_date = min_date;
          gantt.config.end_date = new Date(date_tmp + ( 14* 3600 * 1000 * 24));
          gantt.render()
        });


        gantt.attachEvent("onTaskClick", (id, e) =>{
          if (e.target.className === "gantt_tree_icon gantt_close"){
            gantt.close(id)
          }
          if (e.target.className === "gantt_tree_icon gantt_open"){
            gantt.open(id)
          }
          
          const taskLevel = gantt.calculateTaskLevel(id)
          if (taskLevel > 1){
            // prevent lightbox opening on servers and locations
            if (e.target.className === "gantt_add"){
              this.callLightbox(id)
            }
            if (e.target.className === ""){
              this.callLightbox(id, false)
            }
          }
        })

        gantt.load("http://localhost:3000/data")
        const dp = gantt.createDataProcessor({
            // url: "http://137.135.48.130:3000/data",
            url: "http://localhost:3000/data",
            mode: "REST"
        });

        dp.attachEvent("onAfterUpdate", function(id: string | number, action: any, tid: string | number, response: { status: string; }){  
            var exp = 4000;
            let i;
            switch (action){
              case "TaskAdded":
                if(response.status === "Success"){
                  
                  gantt.changeTaskId(id, tid);
                  gantt.showDate(new Date(Date.now() - (1* 3600 * 1000 * 24))); 
      
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
                        id: Math.random(),
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


    ngOnDestroy(): void{
        gantt.destructor();
    }
}