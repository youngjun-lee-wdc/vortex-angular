import { Directive } from '@angular/core';
import { gantt } from 'opt/gantt_pro/codebase/dhtmlxgantt';

@Directive({
  selector: '[appZoom]'
})
export class ZoomDirective {
  constructor() { 
      //  // allow for zooming in and out of the chart and expand and shrink time periods show on the chart
      //  const hourToStr = gantt.date.date_to_str("%H:%i");

      //  const hourRangeFormat = (step: number) => {
      //      return (date: Date) => {
      //        const ganttDate = Number(gantt.date.add(date, step, "hour")) - 1
      //        const intervalEnd = new Date(ganttDate)
      //        return hourToStr(date) + " - " + hourToStr(intervalEnd);
      //      };
      //  };
      //  gantt.config.min_column_width = 80;
      //  const zoomConfig = {
      //      minColumnWidth: 80,
      //      maxColumnWidth: 150,
      //      levels: [
      //          {
      //            name:"level 6",
      //            scale_height: 27,
      //            min_column_width:80,
      //            scales:[
      //               { unit: "year", format: "%Y", step: 1},
      //               { unit: "month", format: "%M", step: 1}
      //            ]
      //          },
      //          {
      //             name:"level 5",
      //             scale_height: 50,
      //             min_column_width:50,
      //             scales:[
      //               { unit: "month", format: "%M %Y", step: 1},
      //               { unit: "week", step: 1, format: (date: Date) => {
      //                   const dateToStr = gantt.date.date_to_str("%d %M");
      //                   const endDate = gantt.date.add(date, 6, "day");
      //                   return dateToStr(date) + " - " + dateToStr(endDate);}
      //               }
      //             ]
      //           },
      //           {
      //             name:"level 4",
      //             scale_height: 50,
      //             min_column_width:120,
      //             scales:[
      //               { unit: "month", format: "%M %Y", step: 1},
      //               { unit: "day", format: "%D, %M %d", step: 1}
      //             ]
      //            },
      //            {
      //             name:"level 3",
      //             height: 50,
      //             min_column_width:90,
      //             scales:[
      //               { unit: "day", format: "%D, %M %d", step: 1},
      //               { unit: "hour", format: hourRangeFormat(12), step: 12}
      //            ]},
      //            {
      //              name:"level 2",
      //              scale_height: 50,
      //              min_column_width: 30,
      //              scales:[
      //               {unit: "day", format: "%D, %M %d",step: 1},
      //               {unit: "hour",format: hourRangeFormat(6),step: 6}
      //            ]},
      //            {
      //             name:"level 1",
      //             scale_height: 50,
      //             min_column_width: 30,
      //             scales:[
      //               { unit: "day", format: "%D, %M %d", step: 1 },
      //               { unit: "hour", format: "%H:%i", step: 1}
      //           ]},
      //      ],
      //      // TODO: CTRL WHEEL ZOOM NOT WORKING
      //      useKey: "ctrlKey",
      //      trigger: "wheel",
      //      // attaches this component to gantt_task
      //      element: () => { return gantt.$root.querySelector(".gantt_task")}
           
      //  }
      //  gantt.ext.zoom.init(zoomConfig);
      //  //set current level for start-up
      //  gantt.ext.zoom.setLevel(2);
      // }
    // allow for zooming in and out of the chart and expand and shrink time periods show on the chart
    
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
                name: "level0",
                scales: [
                  { unit: "year", format: "%Y", step: 1},
                  { unit: "month", format: "%M", step: 1}
                ],
            },
            {
                name: "level1",
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
                name: "level2",

                scales: [
                  { unit: "month", format: "%M %Y", step: 1},
                  { unit: "day", format: "%D, %M %d", step: 1}
                ],
            },
            {
                name: "level3",
                scales: [
                  { unit: "day", format: "%D, %M %d", step: 1},
                  { unit: "hour", format: hourRangeFormat(12), step: 12}
                ],
            },
            {
                name: "level4",
                scales: [
                  {unit: "day", format: "%D, %M %d",step: 1},
                  {unit: "hour",format: hourRangeFormat(6),step: 6}
                ],
            },
            {
              name: "level5",
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
  }
}
