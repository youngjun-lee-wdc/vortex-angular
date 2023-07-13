import { GanttStatic } from 'dhtmlx-gantt';

export function GanttMarker(gantt: GanttStatic): void{
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