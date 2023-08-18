import { Component, ElementRef, ViewChild } from '@angular/core';
import { SlDrawer } from '@shoelace-style/shoelace';
import { gantt } from 'opt/gantt_pro/codebase/dhtmlxgantt';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  selected?: string;
  servers: string[]
  filtersWrapper: HTMLElement | null
  filtersInputs: HTMLCollectionOf<HTMLInputElement> | undefined

  constructor(){
    this.servers = []
    this.filtersWrapper = document.getElementById("filtersWrapper")
    this.filtersInputs = this.filtersWrapper?.getElementsByTagName("input")
  }

  ngOnChanges(){
    for (var i = 0; i < this.filtersInputs!.length; i++) {
      var filterInput = this.filtersInputs![i];
      console.log(this.filtersInputs)
      console.log("here")
      // attach event handler to update filters object and refresh data (so filters will be applied)
      filterInput.onchange = function () {
        gantt.refreshData();
      }
    }
  }
  
  public switchUpdated = (e: any) =>{
    console.log("here")
    console.log(e)
  }

  ngAfterViewInit(){
    const tempServers: any[] = []
    const filtersWrapper = document.getElementById("filtersWrapper")
    const filtersInputs = filtersWrapper?.getElementsByTagName("input")


    gantt.attachEvent("onAfterTaskUpdate",  (id, task) => {
      if (!tempServers.includes(task.id)){
        filtersWrapper!.innerHTML+= `
        <div class="form-check" >
          <input [(ngModel)]="colorCode"   [checked]="true"  class="form-check-input" name="${task.id}" type="checkbox" id="flexSwitchCheckDefault" (change)="switchUpdated($event)" >
          <label class="form-check-label" for="flexSwitchCheckDefault">${task.id}</label>
        </div>`
      }
    this.filtersWrapper = filtersWrapper
    
    for (let i = 0; i < filtersInputs!.length; i++) {
      let filterInput = filtersInputs![i];
      if (filterInput.checked) {
        if (hasPriority(id, filterInput.name)) {
          return true;
        }
      }
    }
    return false;
    });

    const hasPriority = (parent: string | number, priority: any) => {
      
      if (parent == priority){
        return true;
      }
  
      var child = gantt.getChildren(parent);
      for (var i = 0; i < child.length; i++) {
        if (hasPriority(child[i], priority))
          return true;
      }
      return false;
    }
    for (var i = 0; i < filtersInputs!.length; i++) {
      var filterInput = filtersInputs![i];

      // attach event handler to update filters object and refresh data (so filters will be applied)
      filterInput.onchange = function () {
        gantt.refreshData();
        // updIcon(this);
      }
    }
  }


  
  collapseAll = (): void => {
    gantt.eachTask((task: { $open: boolean }) => {
      task.$open = false;
    });
    gantt.render();
  };
  expandAll = (): void => {
    gantt.eachTask((task: { $open: boolean }) => {
      task.$open = true;
    });
    gantt.render();
  };

  undoFunction = (): void => {
    gantt.undo();
  };

  redoFunction = (): void => {
    gantt.redo();
  };

  toggleAutoScheduling = (): void => {
    gantt.config.auto_scheduling = !gantt.config.auto_scheduling;
  };

  zoomOut = (): void => {
    gantt.ext.zoom.zoomOut();
  };

  zoomIn = (): void => {
    gantt.ext.zoom.zoomIn();
  };

  pdfExport = (): void => {
    gantt.exportToPDF({
      raw: true,
    });
  };

  pngExport = (): void => {
    // workaround for the bug with the export
    gantt.exportToPNG();
  };

  jsonExport = (): void => {
    gantt.exportToJSON();
  };

  onSearchChange = (): void => {
    let search_box = document.getElementById('filter');
    console.log((search_box! as HTMLInputElement).value);
  };
  filterInput = () => {
    let filterData: string;
    let searchBox = document.getElementById('filter');

    gantt.attachEvent('onDataRender', function () {
      searchBox = document.getElementById('filter');
    });

    const changeDetector = () => {
      filterData = (searchBox! as HTMLInputElement).value;
      gantt.refreshData();
    };

    const compareInput = (id: string | number) => {
      let match = false;
    
      // Check if the task's text matches the filter data
      if (
        gantt
          .getTask(id)
          .text.toLowerCase()
          .indexOf(filterData.toLowerCase()) >= 0
      ) {
        match = true;
      }
    
      // If the task has children, check if any child matches the filter data
      if (gantt.hasChild(id)) {
        gantt.eachTask((child_object) => {
          if (
            gantt
              .getTask(child_object.id)
              .text.toLowerCase()
              .indexOf(filterData.toLowerCase()) >= 0
          ) {
            match = true;
          }
        }, id);
      }
    
      return match;
    };
    

    gantt.attachEvent('onBeforeTaskDisplay', (id) => {
      return compareInput(id) ? true : false;
    });
    changeDetector();
    filterData = '';
  };


  


}
