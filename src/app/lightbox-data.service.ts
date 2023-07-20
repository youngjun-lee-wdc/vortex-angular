import { Injectable } from '@angular/core';
import { Task, gantt } from 'opt/gantt_pro/codebase/dhtmlxgantt';
@Injectable({
  providedIn: 'root'
})
export class LightboxDataService {

  constructor() { }

  getTestPlans(){
    let tasks: any[] = []
    gantt.eachTask((task)=>{
      console.log(task)
      tasks.push(task)
    })
    return gantt.serialize().tasks
  }
}
