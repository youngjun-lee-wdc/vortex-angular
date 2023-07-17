import { Component, ElementRef, ViewChild } from '@angular/core';
import { SlDrawer } from '@shoelace-style/shoelace';
import { gantt } from 'opt/gantt_pro/codebase/dhtmlxgantt';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  // template: '<div id="page"><sl-drawer #drawer label="Drawer" class="drawer-focus"></sl-drawer></div>'
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  selected?: string;
  states: string[] = [
    'Alabama',
    'Wisconsin',
    'Wyoming'
  ];


  collapseAll = () :void  =>{
    gantt.eachTask((task: { $open: boolean; }) => {
        task.$open = false;
    });
    gantt.render();
  }
  expandAll = (): void =>{
    gantt.eachTask((task: { $open: boolean; }) => {
        task.$open = true;
    });
    gantt.render();
  }

  undoFunction = ():void => {
    gantt.undo();
  }

  redoFunction = () => {
    gantt.redo();
  }

  toggleAutoScheduling = ():void =>{
    gantt.config.auto_scheduling = !gantt.config.auto_scheduling;
  }

  zoomOut = ():void =>{
    return
  }

  pdfExport = ():void => {
    gantt.exportToPDF({
      raw: true,
    });
  }
  pngExport = ():void => {
    // workaround for the bug with the export
    gantt.exportToPNG();
  }
  jsonExport = ():void =>{
    gantt.exportToJSON()
  }
  onSearchChange = (): void =>{  
    let search_box = document.getElementById("filter");
    console.log((search_box! as HTMLInputElement).value)
  }
  changeDetector = () =>{
    var filter_data: string;
    let search_box = document.getElementById("filter");
    console.log((search_box! as HTMLInputElement).value)
    gantt.attachEvent("onDataRender", function(){
      search_box = document.getElementById("filter");
    });  
    
    function change_detector(){
      filter_data = (search_box! as HTMLInputElement).value;
      gantt.refreshData();
    }
    
    function compare_input(id: string | number ) {
      var match = false;
      // check children's text
      if (gantt.hasChild(id)) {
        gantt.eachTask(function(child_object){
          if (compare_input(child_object.id)) match = true;
        }, id);
      }  
    
      // check task's text
      if (gantt.getTask(id).text.toLowerCase().indexOf(filter_data.toLowerCase()) >= 0)
        match = true;
    
    return match;
    }
    
    gantt.attachEvent("onBeforeTaskDisplay", function (id, task) {
      if (compare_input(id)) {
        return true;
      }
    
      return false;
    });
    change_detector()
    filter_data = ""
  }

  ngOnInit(){
  //   document.addEventListener("DOMContentLoaded", function(event) {
  //     var filterValue = "";
  //     gantt['$doFilter'] = function(value: string){
  //       filterValue = value;
  //       gantt.refreshData();
  //     }
    
  //     gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
  //       if(!filterValue) return true;
    
  //       var normalizedText = task.text.toLowerCase();
  //       var normalizedValue = filterValue.toLowerCase();
  //       return normalizedText.indexOf(normalizedValue) > -1;
  //     });
    
  //     gantt.attachEvent("onGanttRender", function(){
  //       (gantt.$root.querySelector("[data-text-filter]")! as HTMLInputElement).value = filterValue;
  //     })
  // })

    var filter_data: string;
    let search_box = document.getElementById("filter");
    gantt.attachEvent("onDataRender", function(){
      search_box = document.getElementById("filter");
    });  
    
    function change_detector(){
      filter_data = (search_box! as HTMLInputElement).value;
      gantt.refreshData();
    }
    
    function compare_input(id: string | number ) {
      var match = false;
      // check children's text
      if (gantt.hasChild(id)) {
        gantt.eachTask(function(child_object){
          if (compare_input(child_object.id)) match = true;
        }, id);
      }  
    
      // check task's text
      if (gantt.getTask(id).text.toLowerCase().indexOf(filter_data.toLowerCase()) >= 0)
        match = true;
    
    return match;
    }
    
    gantt.attachEvent("onBeforeTaskDisplay", function (id, task) {
      if (compare_input(id)) {
        return true;
      }
    
      return false;
    });
    change_detector()

  }
  
}



// import { Component, ElementRef, ViewChild } from '@angular/core';
// import { SlDrawer } from '@shoelace-style/shoelace';
// import { gantt } from 'opt/gantt_pro/codebase/dhtmlxgantt';

// @Component({
//   selector: 'app-toolbar',
//   templateUrl: './toolbar.component.html',
//   // template: '<div id="page"><sl-drawer #drawer label="Drawer" class="drawer-focus"></sl-drawer></div>'
//   styleUrls: ['./toolbar.component.css']
// })
// export class ToolbarComponent {
//   selected?: string;
//   states: string[] = [
//     'Alabama',
//     'Wisconsin',
//     'Wyoming'
//   ];

//   cachedSettings = {
//     scale_unit
//     date_scale
//     step
//     subscales
//     template
//     start_date
//     end_date
//   }


//   collapseAll = () :void  =>{
//     gantt.eachTask((task: { $open: boolean; }) => {
//         task.$open = false;
//     });
//     gantt.render();
//   }
//   expandAll = (): void =>{
//     gantt.eachTask((task: { $open: boolean; }) => {
//         task.$open = true;
//     });
//     gantt.render();
//   }

//   undoFunction = ():void => {
//     gantt.undo();
//   }

//   redoFunction = () => {
//     gantt.redo();
//   }

//   toggleAutoScheduling = ():void =>{
//     gantt.config.auto_scheduling = !gantt.config.auto_scheduling;
//   }

//   zoomOut = ():void =>{
//     return
//   }

//   toggleMode = (toggle: { enabled: boolean; innerHTML: string; }):void =>{
//     toggle.enabled = !toggle.enabled
//     if (toggle.enabled) {
// 			toggle.innerHTML = "Set default Scale";
// 			//Saving previous scale state for future restore
// 			this.saveConfig();
// 			this.zoomToFit();
// 		} else {

// 			toggle.innerHTML = "Zoom to Fit";
// 			//Restore previous scale state
// 			this.restoreConfig();
// 			gantt.render();
// 		}
//   }

//   restoreConfig() {
// 		this.applyConfig(this.cachedSettings);
// 	}
  
//   applyConfig(config: { scale_unit: string; date_scale: string; template: any; step: number; subscales: any[]; }) {
// 		gantt.config.scale_unit = config.scale_unit;
// 		if (config.date_scale) {
// 			gantt.config.date_scale = config.date_scale;
// 			gantt.templates['date_scale'] = null;
// 		}
// 		else {
// 			gantt.templates['date_scale'] = config.template;
// 		}

// 		gantt.config.step = config.step;
// 		gantt.config.subscales = config.subscales;

// 	}

//   getUnitsBetween(from: string | number | Date, to: string | number | Date, unit: string, step: number) {
// 		var start = new Date(from),
// 			end = new Date(to);
// 		var units = 0;
// 		while (start.valueOf() < end.valueOf()) {
// 			units++;
// 			start = gantt.date.add(start, step, unit);
// 		}
// 		return units;
// 	}

  
//   saveConfig() {
// 		var config = gantt.config;
// 		const cachedSettings = {};
// 		cachedSettings.scale_unit = config.scale_unit;
// 		cachedSettings.date_scale = config.date_scale;
// 		cachedSettings.step = config.step;
// 		cachedSettings.subscales = config.subscales;
// 		cachedSettings.template = gantt.templates['date_scale'];
// 		cachedSettings.start_date = config.start_date;
// 		cachedSettings.end_date = config.end_date;
// 	}
// 	zoomToFit() {
// 		var project = gantt.getSubtaskDates(),
// 			areaWidth = gantt.$task.offsetWidth;

// 		for (var i = 0; i < this.scaleConfigs.length; i++) {
// 			var columnCount = this.getUnitsBetween(project.start_date, project.end_date, this.scaleConfigs[i].unit, this.scaleConfigs[i].step);
// 			if ((columnCount + 2) * gantt.config.min_column_width <= areaWidth) {
// 				break;
// 			}
// 		}

// 		if (i == this.scaleConfigs.length) {
// 			i--;
// 		}

// 		this.applyConfig(this.scaleConfigs[i], project);
// 		gantt.render();
// 	}

//   pdfExport = ():void => {
//     gantt.exportToPDF({
//       raw: true,
//     });
//   }
//   pngExport = ():void => {
//     // workaround for the bug with the export
//     gantt.exportToPNG();
//   }
//   jsonExport = ():void =>{
//     gantt.exportToJSON()
//   }

// //Setting available scales
//  scaleConfigs = [
//   // minutes
//   {
//     unit: "minute", step: 1, scale_unit: "hour", date_scale: "%H", subscales: [
//       {unit: "minute", step: 1, date: "%H:%i"}
//     ]
//   },
//   // hours
//   {
//     unit: "hour", step: 1, scale_unit: "day", date_scale: "%j %M",
//     subscales: [
//       {unit: "hour", step: 1, date: "%H:%i"}
//     ]
//   },
//   // days
//   {
//     unit: "day", step: 1, scale_unit: "month", date_scale: "%F",
//     subscales: [
//       {unit: "day", step: 1, date: "%j"}
//     ]
//   },
//   // weeks
//   {
//     unit: "week", step: 1, scale_unit: "month", date_scale: "%F",
//     subscales: [
//       {
//         unit: "week", step: 1, template: function (date: Date) {
//           var dateToStr = gantt.date.date_to_str("%d %M");
//           var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
//           return dateToStr(date) + " - " + dateToStr(endDate);
//         }
//       }
//     ]
//   },
//   // months
//   {
//     unit: "month", step: 1, scale_unit: "year", date_scale: "%Y",
//     subscales: [
//       {unit: "month", step: 1, date: "%M"}
//     ]
//   },
//   // quarters
//   {
//     unit: "month", step: 3, scale_unit: "year", date_scale: "%Y",
//     subscales: [
//       {
//         unit: "month", step: 3, template: function (date: Date) {
//           var dateToStr = gantt.date.date_to_str("%M");
//           var endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
//           return dateToStr(date) + " - " + dateToStr(endDate);
//         }
//       }
//     ]
//   },
//   // years
//   {
//     unit: "year", step: 1, scale_unit: "year", date_scale: "%Y",
//     subscales: [
//       {
//         unit: "year", step: 5, template: function (date: Date) {
//           var dateToStr = gantt.date.date_to_str("%Y");
//           var endDate = gantt.date.add(gantt.date.add(date, 5, "year"), -1, "day");
//           return dateToStr(date) + " - " + dateToStr(endDate);
//         }
//       }
//     ]
//   },
//   // decades
//   {
//     unit: "year", step: 10, scale_unit: "year", template: function (date: Date) {
//       var dateToStr = gantt.date.date_to_str("%Y");
//       var endDate = gantt.date.add(gantt.date.add(date, 10, "year"), -1, "day");
//       return dateToStr(date) + " - " + dateToStr(endDate);
//     },
//     subscales: [
//       {
//         unit: "year", step: 100, template: function (date: Date) {
//           var dateToStr = gantt.date.date_to_str("%Y");
//           var endDate = gantt.date.add(gantt.date.add(date, 100, "year"), -1, "day");
//           return dateToStr(date) + " - " + dateToStr(endDate);
//         }
//       }
//     ]
//   }
// ];
// }

