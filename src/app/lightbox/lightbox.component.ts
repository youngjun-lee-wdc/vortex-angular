import { Component, ElementRef, ViewChild } from '@angular/core';
import { Task, gantt } from 'opt/gantt_pro/codebase/dhtmlxgantt';

import * as bootstrap from "bootstrap"
import { Modal } from "bootstrap"
import { LightboxDataService } from '../lightbox-data.service';
declare var window: any;
@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css'],
  providers: []
})
export class LightboxComponent{
    // @ViewChild('exampleModal', {static:true}) exampleModal: ElementRef
    formModal: bootstrap.Modal;
    ganttTasks: Task[] = []
    public testSuites: any;
    public selectedTestSuite: any = "Completed"
    public dutOptions: any;


    constructor(){
      console.log(gantt)
    }
    
    ngOnInit(){
      this.formModal = new window.bootstrap.Modal(
        document.getElementById("exampleModal")
        )
    }

    ngAfterContentChecked(){
      
      gantt.attachEvent("onBeforeLightbox", function(task_id) {
        const task = gantt.getTask(task_id)
        const taskParent = gantt.getTask(task.parent!)
        const taskGrandParent = gantt.getTask(taskParent.parent!)
        const dutOptions = gantt.serverList(taskGrandParent.text)
        this.dutOptions = dutOptions
        console.log(dutOptions)
      })
      
      const testSuites:any[] = []
      gantt.eachTask((task)=>{
        // console.log(testSuites)
        testSuites.push(task.text)
        // testSuites[task.id] = task.text
      })
      // console.log(testSuites)
      this['testSuites'] = testSuites
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
