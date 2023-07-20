import { Component, ElementRef, ViewChild } from '@angular/core';
import { Task, gantt } from 'opt/gantt_pro/codebase/dhtmlxgantt';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf, JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import * as bootstrap from "bootstrap"
import { Modal } from "bootstrap"
import { LightboxDataService } from '../lightbox-data.service';
declare var window: any;
@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css'],
  providers: [],
  
})
export class LightboxComponent{
    // @ViewChild('exampleModal', {static:true}) exampleModal: ElementRef
    formModal: bootstrap.Modal;
    ganttTasks: Task[] = []
    public testSuites: any;
    public dutOptions: any;
    public selected: {startDate: Date, endDate: Date};
    public ngxDaterangepickerMd: any;


    constructor(){
      console.log(gantt)
    }
    
    ngOnInit(){
      this.formModal = new window.bootstrap.Modal(
        document.getElementById("exampleModal")
        )
    }

    ngAfterContentChecked(){
      gantt.attachEvent("onBeforeLightbox", (task_id) => {
        const task = gantt.getTask(task_id)
        console.log(task)
        // const taskParent = gantt.getTask(task.parent!)
        // const taskGrandParent = gantt.getTask(taskParent.parent!)
        // dutOptions = gantt.serverList(taskGrandParent.text)
        // console.log(dutOptions)
      })
      
      // console.log(dutOptions)
      // this.dutOptions = dutOptions
      
      const dutOptions: any[][] = []
      const testSuites:any[] = []
      gantt.eachTask((task)=>{
        testSuites.push(task.text)
        
        // let dut = gantt?.serverList(gantt.getTask(task?.parent)?.text)
        // if (dut) dutOptions.push(dut)
        // try{
          // var taskId = gantt.getTask(task);  
          // var task_parent = gantt.getTask(taskId.parent!)
          // var task_grandparent = gantt.getTask(task_parent.parent!)
          // var dut_opts = gantt.serverList(task_grandparent.text)
          // if (dut_opts){
            // dutOptions.push(dut_opts)
          // }
        // }
        // catch(e){}
      })
      // console.log(testSuites)
      this['testSuites'] = testSuites
      this['dutOptions'] = gantt.serverList("availablefirmwares").flatMap(((x: { value: any; })=> x.value))
      const myModal = this.formModal
    //   const testSuites:any[] = []
      gantt.showLightbox = (taskId) => {
        myModal.show()
      }
    }
    

    // ngOnChanges(){
      // const testSuites:any[] = []
      // gantt.eachTask((task)=>{
        // console.log(testSuites)
        // testSuites.push(task)
        // testSuites[task.id] = task.text
      // })
      // console.log(testSuites)
      // this['testSuites'] = testSuites
      // console.log(this['testSuites'])
    // }

    // ngAfterViewChecked(){
    //   const myModal = this.formModal
    //   const testSuites:any[] = []
    //   gantt.showLightbox = function(id) {
    //     gantt.eachTask((task)=>{
    //       // console.log(testSuites)
    //       // testSuites.push(task)
    //       testSuites[task.id] = task.text
    //     })
    //     console.log(testSuites)
    //     this['testSuites'] = testSuites
    //     console.log(this['testSuites'])
    //     myModal.show()

    //   }

    // }



    
}
