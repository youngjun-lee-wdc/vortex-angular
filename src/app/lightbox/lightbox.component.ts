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
    public uniqueTestPlans: any

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

    deleteTask() {
      gantt.deleteTask(this.taskId);
      gantt.hideLightbox();
    }

    saveTask(){
      const task = this.newTask
      
      if(task["$new"]){
          delete task["$new"];
          gantt.addTask({
            id: this.taskId,
            parent: task.parent,
            text: this.testSuiteSelected,
            test_plan_dropdown: this.testPlanSelected,
            FW_version: this.firmwareVersionSelected,
            start_date: new Date(this.dateSelected.startDate),
            end_date: new Date(this.dateSelected.endDate),
            duration: gantt.calculateDuration({
              start_date: new Date(this.dateSelected.startDate),
              end_date: new Date(this.dateSelected.endDate)
            })
          }, task.parent)

      }else{
          // gantt.updateTask(task.id);

          // check which variables got updated:



          gantt.updateTask(this.taskId, {
            id: this.taskId,
            text: (this.testSuiteSelected === undefined) ? gantt.getTask(this.taskId).text : this.testSuiteSelected,
            test_plan_dropdown: (this.testPlanSelected === undefined) ? gantt.getTask(this.taskId)['test_plan_dropdown'] : this.testPlanSelected,
            FW_version: (this.firmwareVersionSelected === undefined) ? gantt.getTask(this.taskId)['FW_version'] : this.firmwareVersionSelected,
            start_date: (this.dateSelected.startDate === undefined) ? gantt.getTask(this.taskId)['start_date'] : new Date(this.dateSelected.startDate), 
            end_date: (this.dateSelected.endDate === undefined) ? gantt.getTask(this.taskId)['end_date'] : new Date(this.dateSelected.endDate),
            duration: gantt.calculateDuration({
              start_date: new Date(this.dateSelected.startDate),
              end_date: new Date(this.dateSelected.endDate)
            })
          })
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

    getUniqueTestPlans(){
      let options:any = []   
      gantt.eachTask((task)=>{
        const entry1 = task.test_plan_writein;
        if (entry1 && !(options.includes(entry1))){
          options.push(entry1)
        }
        const entry2 = task.test_plan_dropdown
        if (entry2 && !(options.includes(entry2))){
          options.push(entry2)
        }
        if (options.includes("NaN")){ 
          options.splice(options.indexOf("NaN"), 1);        
        }

        let uniqueOptions = []
        for (let i=0;i<options.length; i++){
          uniqueOptions.push(options[i])
        }
        this.uniqueTestPlans = uniqueOptions
      })
    }

    ngAfterViewChecked(){
      gantt.showLightbox = (taskId) => {
        this.taskId = taskId
        this.newTask = gantt.getTask(taskId)
        this.getUniqueTestPlans()
        this.initLightBox()
        const myModal = this.formModal
        myModal.show()
      }

      gantt.hideLightbox = () =>{
        this.formModal.hide()
      }
    }    
}
