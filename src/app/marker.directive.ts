import { AfterViewInit, Directive, OnInit } from '@angular/core';
import { gantt } from 'dhtmlx-gantt';

@Directive({
  selector: '[appMarker]'
})
export class MarkerDirective implements AfterViewInit {

  ngAfterViewInit(): void {
    let markerId = gantt.addMarker({
      start_date: new Date(),
      css: "today", 
      text: "Current Time", 
      title: new Date().toString()
     });

    setInterval(()=>{
        gantt.getMarker(markerId).start_date = new Date();
        gantt.getMarker(markerId).title = new Date().toString();
        gantt.updateMarker(markerId);
    }, 1000);
  }

}
