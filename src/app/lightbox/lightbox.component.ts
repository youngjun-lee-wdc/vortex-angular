import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as bootstrap from "bootstrap";
import { Task, gantt } from 'opt/gantt_pro/codebase/dhtmlxgantt';
declare var window: any;

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css'],  
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
    public isNewTask: boolean
    @Input() task: any
    taskForm: FormGroup

    constructor(){
      this.minStartDate = new Date().toISOString()
    }

    public showLightbox = (taskId: string | number, isNewTask: boolean) => {
      this.isNewTask = isNewTask
      this.formModal = new window.bootstrap.Modal(
        document.getElementById("exampleModal")
      )
      this.taskId = taskId
      this.newTask = gantt.getTask(taskId)
      this.getUniqueTestPlans()
      this.initLightBox()
      const myModal = this.formModal
      myModal.show()
    }

    hideLightbox = () =>{
      this.formModal.hide()
    }
    
    cancel() {
      let task = gantt.getTask(this.taskId);
   
      if(task.$new)
      gantt.deleteTask(task.id);
      gantt.hideLightbox();
    }
   
    getForm() {
      return document.getElementById("my-form");
    };

    deleteTask() {
      gantt.deleteTask(this.taskId);
      // gantt.hideLightbox();
    }

    saveTask(){
      const task = this.newTask
      
      if (this.isNewTask){
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
      }
      // if(task["$new"]){
          // delete task["$new"];
          // gantt.addTask({
            // id: this.taskId,
            // parent: task.parent,
            // text: this.testSuiteSelected,
            // test_plan_dropdown: this.testPlanSelected,
            // FW_version: this.firmwareVersionSelected,
            // start_date: new Date(this.dateSelected.startDate),
            // end_date: new Date(this.dateSelected.endDate),
            // duration: gantt.calculateDuration({
              // start_date: new Date(this.dateSelected.startDate),
              // end_date: new Date(this.dateSelected.endDate)
            // })
          // }, task.parent)
      // }
      else{
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
      this.hideLightbox()
      gantt.hideLightbox();
    }


    initLightBox(){
        try{
          const taskParent = gantt.getTask(this.newTask.parent!)
          const serverName = gantt.serverList(taskParent.text)
          this['testSuites'] = serverName.flatMap(((x: { value: any; })=> x.value))
        }
        catch(e){
          console.log(e)
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

}
