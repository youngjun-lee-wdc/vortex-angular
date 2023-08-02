import { Component, Input } from '@angular/core';
<<<<<<< HEAD
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
=======
import { FormGroup } from '@angular/forms';
>>>>>>> a448045019b09c42827cedd3e0cb8d6aa94bdcc8
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

<<<<<<< HEAD
    constructor(private fb: FormBuilder){
      this.minStartDate = new Date().toISOString()
      this.dateSelected = {startDate: new Date(), endDate: new Date()}
    }

    ngOnInit(){
      this.taskForm = this.fb.group({
        testSuite: [null, Validators.required],
        firmwareVersion: [null, Validators.required],
        testPlan: [null, Validators.required],
        // newTestPlan: [null],
        dateSelected: [null, Validators.required]
      })
=======
    constructor(){
      this.minStartDate = new Date().toISOString()
>>>>>>> a448045019b09c42827cedd3e0cb8d6aa94bdcc8
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
<<<<<<< HEAD
      // reset forms for all options
      this.formModal.hide()
      this.testSuiteSelected = undefined
      this.testPlanSelected = undefined
      this.firmwareVersionSelected = undefined
      this.dateSelected = {startDate: new Date(), endDate: new Date()}
=======
      this.formModal.hide()
>>>>>>> a448045019b09c42827cedd3e0cb8d6aa94bdcc8
    }
    
    cancel() {
      let task = gantt.getTask(this.taskId);
<<<<<<< HEAD
      gantt.deleteTask(task.id);
      gantt.hideLightbox();
    }

    deleteTask() {
      if (this.isNewTask){
        this.hideLightbox()
      }
      else {
        gantt.deleteTask(this.taskId);
      }
        // gantt.hideLightbox();
    }

    saveTask(){

      if (this.taskForm.invalid){
        console.log("invalid form")
        return
      }
      const task = this.newTask

      
      if (this.isNewTask){
        const taskToBeAdded = {
          parent: this.taskId,
          text: this.testSuiteSelected,
          test_plan_dropdown : this.testPlanSelected,
          test_plan_writein: this.newTestPlan,
          FW_version: this.firmwareVersionSelected,
          start_date: new Date(this.dateSelected.startDate),
          end_date: new Date(this.dateSelected.endDate),
          duration: gantt.calculateDuration({
            start_date: new Date(this.dateSelected.startDate),
            end_date: new Date(this.dateSelected.endDate)
          })
        }
        console.log(taskToBeAdded)
=======
   
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
      console.log("test plan: ", this.testPlanSelected)
      
      if (this.isNewTask){
>>>>>>> a448045019b09c42827cedd3e0cb8d6aa94bdcc8
        gantt.addTask({
          parent: this.taskId,
          text: this.testSuiteSelected,
          test_plan_dropdown : this.testPlanSelected,
          test_plan_writein: this.newTestPlan,
          FW_version: this.firmwareVersionSelected,
          start_date: new Date(this.dateSelected.startDate),
          end_date: new Date(this.dateSelected.endDate),
          duration: gantt.calculateDuration({
            start_date: new Date(this.dateSelected.startDate),
            end_date: new Date(this.dateSelected.endDate)
          })
        })
<<<<<<< HEAD
        // const returnAdd = gantt.addTask(taskToBeAdded)
        // console.log(returnAdd)
=======
>>>>>>> a448045019b09c42827cedd3e0cb8d6aa94bdcc8
      }

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
<<<<<<< HEAD
=======
      // gantt.hideLightbox();
>>>>>>> a448045019b09c42827cedd3e0cb8d6aa94bdcc8
    }


    initLightBox(){
<<<<<<< HEAD

        // restore values for selected test configs and populate dropdown before lightbox is shown
        if (!this.isNewTask){
          const selectedTask = gantt.getTask(this.taskId)
          this.testSuiteSelected = selectedTask['text']
          this.firmwareVersionSelected = selectedTask['FW_version']
          this.testPlanSelected = selectedTask['test_plan_dropdown']
          // this.dateSelected.startDate = selectedTask['start_date']!
          // this.dateSelected.endDate = selectedTask['end_date']!
          this.dateSelected = { startDate: selectedTask['start_date']!, endDate: selectedTask['end_date']! }
        }
        else{

          // this.dateSelected = undefined
        }
=======
>>>>>>> a448045019b09c42827cedd3e0cb8d6aa94bdcc8
        try{
          const taskParent = gantt.getTask(this.newTask.parent!)
          const serverName = gantt.serverList(taskParent.text)
          this['testSuites'] = serverName.flatMap(((x: { value: any; })=> x.value))
        }
        catch(e){
          console.log(e)
        }
<<<<<<< HEAD
=======
        // restore values for selected test configs and populate dropdown before lightbox is shown
        if (!this.isNewTask){
          const selectedTask = gantt.getTask(this.taskId)
          this.testSuiteSelected = selectedTask['text']
          this.firmwareVersionSelected = selectedTask['FW_version']
          this.testPlanSelected = selectedTask['test_plan_dropdown']
          this.dateSelected = { startDate: selectedTask['start_date']!, endDate: selectedTask['end_date']! }
        }
>>>>>>> a448045019b09c42827cedd3e0cb8d6aa94bdcc8
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
