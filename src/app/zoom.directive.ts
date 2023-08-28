import { Directive } from '@angular/core';
import { gantt } from 'opt/gantt_pro/codebase/dhtmlxgantt';

@Directive({
  selector: '[appZoom]'
})
export class ZoomDirective {
  constructor() { 
    
    const hourToStr = gantt.date.date_to_str("%H:%i");

    const hourRangeFormat = (step: number) => {
        return (date: Date) => {
          const ganttDate = Number(gantt.date.add(date, step, "hour")) - 1
          const intervalEnd = new Date(ganttDate)
          return hourToStr(date) + " - " + hourToStr(intervalEnd);
        };
    };
    const zoomConfig = {
        minColumnWidth: 80,
        maxColumnWidth: 150,
        levels: [
            {
                name: "Year",
                scales: [
                  { unit: "year", format: "%Y", step: 1},
                  { unit: "month", format: "%M", step: 1}
                ],
            },
            {
                name: "Month",
                scales: [
                  { unit: "month", format: "%M %Y", step: 1},
                  { unit: "week", step: 1, format: function (date: Date) {
                      var dateToStr = gantt.date.date_to_str("%d %M");
                      var endDate = gantt.date.add(date, 6, "day");
                      return dateToStr(date) + " - " + dateToStr(endDate);}
                  }
                ],
            },
            {
                name: "Week",
                scales: [
                  { unit: "month", format: "%M %Y", step: 1},
                  { unit: "day", format: "%D, %M %d", step: 1}
                ],
            },
            {
                name: "Day",
                scales: [
                  { unit: "day", format: "%D, %M %d", step: 1},
                  { unit: "hour", format: hourRangeFormat(12), step: 12}
                ],
            },
            {
                name: "l4",
                scales: [
                  {unit: "day", format: "%D, %M %d",step: 1},
                  {unit: "hour",format: hourRangeFormat(6),step: 6}
                ],
            },
            {
              name: "l5",
              scales: [
                { unit: "day", format: "%D, %M %d", step: 1 },
                { unit: "hour", format: "%H:%i", step: 1}
              ],
          },
        ],
        useKey: "ctrlKey",
        trigger: "wheel",
        element: function () {
            return gantt.$root.querySelector(".gantt_task");
        },
    };
    
    gantt.ext.zoom.init(zoomConfig);
    gantt.ext.zoom.setLevel(2);
    
    gantt.attachEvent("onAfterTaskAdd", function(id,item){
      gantt.showDate(new Date(Date.now() - ( 1* 3600 * 1000 * 24)));
    });
  }
}
