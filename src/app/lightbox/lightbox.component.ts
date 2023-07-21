import { Component } from '@angular/core';
import * as bootstrap from "bootstrap";
import { Task, gantt } from 'opt/gantt_pro/codebase/dhtmlxgantt';
declare var window: any;
@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css'],
  providers: [],
  
})
export class LightboxComponent{
    private formModal: bootstrap.Modal;
    public testSuites: any;
    public dutOptions: any;
    public ngxDaterangepickerMd: any;
    public minStartDate: any;
    public taskId: string | number
    public newTask: Task
    public testSuiteSelected: any
    public firmwareVersionSelected: any;
    public testPlanSelected: any
    public newTestPlan: string
    public dateSelected: {startDate: Date , endDate: Date};


    constructor(){
      this.minStartDate = new Date().toISOString()
    }

    cancel() {
      var task = gantt.getTask(this.taskId);
   
      if(task.$new)
      gantt.deleteTask(task.id);
      gantt.hideLightbox();
    }
   
    getForm() {
      return document.getElementById("my-form");
    };

    remove() {
      gantt.deleteTask(this.taskId);
      gantt.hideLightbox();
    }

    save(){
      // console.log(this.taskId)
      // var task = gantt.getTask(this.taskId);
      const task = this.newTask
      
      console.log(task["$new"])
      // const text = task.text = (this.getForm()?.querySelector("[name='description']") as HTMLInputElement).value;
      // console.log(this.testSuiteSelected)
      if(task["$new"]){
          delete task["$new"];
          // gantt.addTask(task,task.parent);
          gantt.addTask({
            id: this.taskId,
            parent: task.parent,
            text: "test",
            start_date: new Date(this.dateSelected.startDate),
            end_date: new Date(this.dateSelected.endDate),
            duration: gantt.calculateDuration({
              start_date: new Date(this.dateSelected.startDate),
              end_date: new Date(this.dateSelected.endDate)
            })
          }, task.parent)
          console.log(gantt.getTask(this.taskId))

      }else{
          
          gantt.updateTask(task.id);
          console.log(gantt.getTask(this.taskId))
      }
   
      gantt.hideLightbox();
    }

    ngOnInit(){
      this.formModal = new window.bootstrap.Modal(
        document.getElementById("exampleModal")
        )
    }

    initLightBox(){
        try{
          const taskParent = gantt.getTask(this.newTask.parent!)
          const taskGrandParent = gantt.getTask(taskParent.parent!)
          const serverName = gantt.serverList(taskGrandParent.text)
          this['testSuites'] = serverName.flatMap(((x: { value: any; })=> x.value))
        }
        catch(e){
          console.log
        }
      this['dutOptions'] = gantt.serverList("availablefirmwares").flatMap(((x: { value: any; })=> x.value))
    }

    ngAfterViewChecked(){
      gantt.showLightbox = (taskId) => {
        this.taskId = taskId
        this.newTask = gantt.getTask(taskId)
        this.initLightBox()
        const myModal = this.formModal

        myModal.show()


      }
    }


    
}
