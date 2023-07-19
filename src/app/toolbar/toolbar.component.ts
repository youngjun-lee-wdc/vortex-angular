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
    gantt.ext.zoom.zoomOut();
  }
  
  zoomIn = (): void =>{
    gantt.ext.zoom.zoomIn();
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
  filterInput = () =>{
    let filterData: string;
    let searchBox = document.getElementById("filter");


    gantt.attachEvent("onDataRender", function(){
      searchBox = document.getElementById("filter");
    });  
    
    const changeDetector = () =>{
      filterData = (searchBox! as HTMLInputElement).value;
      gantt.refreshData();
    }
    
    const compareInput = (id: string | number ) => {
      var match = false;
      // check children's text
      if (gantt.hasChild(id)) {
        gantt.eachTask((child_object)=>{
          if (compareInput(child_object.id)) match = true;
        }, id);
      }  

      if (gantt.getTask(id).text.toLowerCase().indexOf(filterData.toLowerCase()) >= 0)
        match = true;
    
    return match;
    }
    
    gantt.attachEvent("onBeforeTaskDisplay", (id) => {
      return compareInput(id) ? true: false

    });
    changeDetector()
    filterData = ""
  }

  
}
