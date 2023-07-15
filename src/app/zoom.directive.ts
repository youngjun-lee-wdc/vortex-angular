import { Directive } from '@angular/core';
import { gantt } from 'opt/gantt_pro/codebase/dhtmlxgantt';

@Directive({
  selector: '[appZoom]'
})
export class ZoomDirective {

  constructor() { 
       // allow for zooming in and out of the chart and expand and shrink time periods show on the chart
       const hourToStr = gantt.date.date_to_str("%H:%i");

       const hourRangeFormat = (step: number) => {
           return (date: Date) => {
             const ganttDate = Number(gantt.date.add(date, step, "hour")) - 1
             const intervalEnd = new Date(ganttDate)
             return hourToStr(date) + " - " + hourToStr(intervalEnd);
           };
       };
       gantt.config.min_column_width = 80;
       const zoomConfig = {
           minColumnWidth: 80,
           maxColumnWidth: 150,
           levels: [
               {
                 name:"day",
                 scale_height: 27,
                 min_column_width:80,
                 scales:[
                     {unit: "day", step: 1, format: "%d %M"}
                 ]
               },
               {
                  name:"week",
                  scale_height: 50,
                  min_column_width:50,
                  scales:[
                   {unit: "week", step: 1, format: function (date: Date) {
                    var dateToStr = gantt.date.date_to_str("%d %M");
                    var endDate = gantt.date.add(date, 6, "day");
                    var weekNum = gantt.date.date_to_str("%W")(date);
                    return "#" + weekNum + ", " + dateToStr(date) + " - " + dateToStr(endDate);
                    }},
                    {unit: "day", step: 1, format: "%j %D"}
                  ]
                },
                {
                  name:"month",
                  scale_height: 50,
                  min_column_width:120,
                  scales:[
                     {unit: "month", format: "%F, %Y"},
                     {unit: "week", format: "Week #%W"}
                  ]
                 },
                 {
                  name:"quarter",
                  height: 50,
                  min_column_width:90,
                  scales:[
                   {unit: "month", step: 1, format: "%M"},
                   {
                    unit: "quarter", step: 1, format: function (date: Date) {
                     var dateToStr = gantt.date.date_to_str("%M");
                     var endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
                     return dateToStr(date) + " - " + dateToStr(endDate);
                    }
                  }
                 ]},
                 {
                   name:"year",
                   scale_height: 50,
                   min_column_width: 30,
                   scales:[
                     {unit: "year", step: 1, format: "%Y"}
                 ]}
           ],
           // TODO: CTRL WHEEL ZOOM NOT WORKING
           useKey: "ctrlKey",
           trigger: "wheel",
           // attaches this component to gantt_task
           element: () => { return gantt.$root.querySelector(".gantt_task")}
       }
       gantt.ext.zoom.init(zoomConfig);
       //set current level for start-up
       gantt.ext.zoom.setLevel(1);
   }

}
