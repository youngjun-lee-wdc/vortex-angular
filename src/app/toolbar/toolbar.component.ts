import { Component } from '@angular/core';
import { gantt } from 'opt/gantt_pro/codebase/dhtmlxgantt';

interface filterContentType {
  [key: string]: {
      id: string;
      parent?: string;      
  }
}

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
  filtersContent: filterContentType

  constructor(){
    this.servers = []
    this.filtersWrapper = document.getElementById("filtersWrapper")
    this.filtersInputs = this.filtersWrapper?.getElementsByTagName("input")
    this.filtersContent = {}
  }

  ngOnInit(){
    this.getFiltersContent();
  }
  
  public getFiltersContent(){
    gantt.attachEvent("onAfterTaskUpdate",  (id, task) => {
      this.filtersContent[task.id] = {id: task.id, parent: task.parent}
    })
  }
  
  public switchUpdated = () =>{
    console.log("here")
    // gantt.refreshData()
  }
  
  public collapseAll = (): void => {
    gantt.eachTask((task: { $open: boolean }) => {
      task.$open = false;
    });
    gantt.render();
  };
  public expandAll = (): void => {
    gantt.eachTask((task: { $open: boolean }) => {
      task.$open = true;
    });
    gantt.render();
  };

  public undoFunction = (): void => {
    gantt.undo();
  };

  public redoFunction = (): void => {
    gantt.redo();
  };

  public toggleAutoScheduling = (): void => {
    gantt.config.auto_scheduling = !gantt.config.auto_scheduling;
  };

  public zoomOut = (): void => {
    gantt.ext.zoom.zoomOut();
  };

  public zoomIn = (): void => {
    gantt.ext.zoom.zoomIn();
  };

  public pdfExport = (): void => {
    gantt.exportToPDF({
      raw: true,
    });
  };

  public pngExport = (): void => {
    // workaround for the bug with the export
    gantt.exportToPNG();
  };

  public jsonExport = (): void => {
    gantt.exportToJSON();
  };

  public onSearchChange = (): void => {
    let search_box = document.getElementById('filter');
    console.log((search_box! as HTMLInputElement).value);
  };
  
  public filterInput = () => {
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
