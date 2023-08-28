import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from "bootstrap";
import { Task, gantt } from 'opt/gantt_pro/codebase/dhtmlxgantt';
declare var window: any;


// interface TaskForm {
//   testSuites: FormControl<any>
//   firmwareVersionSelected: FormControl<any>
//   testPlanSelected: FormControl<any>
//   newTestPlan?: FormControl<any>
//   dateSelected: FormControl<any>
// }


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
    public newTestPlan: string | undefined
    public dateSelected: {startDate: Date , endDate: Date};
    public uniqueTestPlans: any
    public isNewTask: boolean
    @Input() task: any
    taskForm: FormGroup

    constructor(private fb: FormBuilder){
      this.minStartDate = new Date().toISOString()
      this.dateSelected = {startDate: new Date(), endDate: new Date()}
    }

    ngOnInit(){
      this.taskForm = this.fb.group({
        testSuite: ['', Validators.required],
        firmwareVersion: ['', Validators.required],
        testPlan: ['', Validators.required],
        newTestPlan: [''],
        dateSelected: ['', Validators.required]
      })
    }

    public showLightbox = (taskId: string | number, isNewTask: boolean) => {
      this.isNewTask = isNewTask
      this.formModal = new window.bootstrap.Modal(
        document.getElementById("lightboxModal")
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
      let task = gantt.getTask(this.taskId);
      gantt.deleteTask(task.id);
      this.hideLightbox();
    }

    public deleteTask() {
      if (this.isNewTask){
        this.hideLightbox()
      }
      else {
        gantt.deleteTask(this.taskId);
      }
        // gantt.hideLightbox();
    }

    public saveTask(){
      if (this.taskForm.invalid){
        console.log("invalid form")
        return
      }

      
      if (this.isNewTask){
        console.log("this.newTestPlan: ", this.newTestPlan)
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
        // const returnAdd = gantt.addTask(taskToBeAdded)
        // console.log(returnAdd)
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
          // this.dateSelected.startDate = selectedTask['start_date']!
          // this.dateSelected.endDate = selectedTask['end_date']!
          this.dateSelected = { startDate: selectedTask['start_date']!, endDate: selectedTask['end_date']! }
        }
        else{
          // this.dateSelected = undefined
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
        this.uniqueTestPlans = uniqueOptions
      })
    }

}
