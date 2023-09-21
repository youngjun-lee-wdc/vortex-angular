import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from "bootstrap";
import { Task, gantt } from 'opt/gantt_pro/codebase/dhtmlxgantt';
import * as dayjs from "dayjs"
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
    public taskId: string | number
    public newTask: Task
    public testSuiteSelected: any
    public firmwareVersionSelected: any;
    public testPlanSelected: any
    public newTestPlan: string | undefined
    public dateSelected: {startDate: Date , endDate: Date};
    public uniqueTestPlans: any
    public isNewTask: boolean
    @Input() task: any
    taskForm: FormGroup

    constructor(private fb: FormBuilder){
      this.dateSelected = {startDate: new Date(), endDate: new Date()}
    }

    ngOnInit(){
      this.taskForm = this.fb.group({
        testSuite: ['', Validators.required],
        firmwareVersion: ['', Validators.required],
        testPlan: [''],
        newTestPlan: [''],
        dateSelected: ['', Validators.required]
      })
    }
    
    setTime(event: any){
      // console.log(event)
      // console.log(event.startDate)
      const startDateShift = new Date(event.startDate)
      const endDateShift = new Date(event.endDate)
      startDateShift.setHours(startDateShift.getHours() + 7)
      endDateShift.setHours(endDateShift.getHours() + 7)
      this.dateSelected = { startDate: startDateShift, endDate: endDateShift }
    }

    public showLightbox = (taskId: string | number, isNewTask: boolean) => {
      this.isNewTask = isNewTask
      const lightboxModal = document.getElementById("lightboxModal")
      lightboxModal?.addEventListener('hidden.bs.modal', () => {
        gantt.showDate(new Date(Date.now() - ( 1* 3600 * 1000 * 24))); 
      })
      this.formModal = new window.bootstrap.Modal(
        lightboxModal
      )
      this.taskId = taskId
      this.newTask = gantt.getTask(taskId)
      this.getUniqueTestPlans()
      this.initLightBox()
      const myModal = this.formModal
      myModal.show()
    }

    private hideLightbox = () =>{
      // reset forms for all options
      this.formModal.hide()
      this.testSuiteSelected = undefined
      this.testPlanSelected = undefined
      this.firmwareVersionSelected = undefined
      this.newTestPlan = undefined
      this.dateSelected = {startDate: new Date(), endDate: new Date()}
      gantt.showDate(new Date(Date.now() - ( 1* 3600 * 1000 * 24))); 
    }
    
    public cancel() {
      this.hideLightbox();
    }

    public deleteTask() {
      if (this.isNewTask){
        this.hideLightbox()
      }
      else {
        gantt.deleteTask(this.taskId);
      }
    }

    public saveTask(){
      if (this.taskForm.invalid){
        return
      }
      
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
        gantt.addTask(taskToBeAdded)
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
    }


    private initLightBox(){
        // restore values for selected test configs and populate dropdown before lightbox is shown
        if (!this.isNewTask){
          const selectedTask = gantt.getTask(this.taskId)
          this.testSuiteSelected = selectedTask['text']
          this.firmwareVersionSelected = selectedTask['FW_version']
          this.testPlanSelected = selectedTask['test_plan_dropdown']
          this.dateSelected = { startDate: selectedTask['start_date']!, endDate: selectedTask['end_date']! }
        }
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

    private getUniqueTestPlans(){
      let options:any = []   
      gantt.eachTask((task: Task) =>{
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
        uniqueOptions.push("Test Plan")
        this.uniqueTestPlans = uniqueOptions
      })
    }

}
