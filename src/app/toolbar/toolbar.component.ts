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
  levels: {[id: string]: boolean}

  constructor(){
    this.servers = []
    this.filtersWrapper = document.getElementById("filtersWrapper")
    this.filtersInputs = this.filtersWrapper?.getElementsByTagName("input")
    this.filtersContent = {}
    this.levels = {}
  }

  ngOnInit(){
    this.getFiltersContent();
  }
  
  public getFiltersContent(){
    gantt.attachEvent("onAfterTaskUpdate",  (id, task) => {
      this.filtersContent[task.id] = {id: task.id, parent: task.parent}
      this.levels[id] = true
    })
  }
  
  public switchUpdated = (checkbox: any) => {
    // gantt.render()
    // gantt.refreshData()
    const checked = checkbox.target.checked;
    const checkboxFilter = checkbox.target.name
    this.levels[checkboxFilter] = checked
    
    const changeDetector = () => {
        gantt.refreshData();
    };
    
    const compareInput = (id: string ) => {
      console.log(this.levels)
      return this.levels[id]
      if (!id.startsWith('vm')){

        return this.levels[id]
      }
      // if (id.startsWith("vm")){
        // console.log(this.levels[id])
        // return this.levels[id]
      // }
      // return false
      // return id !== checkboxFilter
      // console.log(this.levels[id])
      // return this.levels[id]
      return false
    }

    gantt.attachEvent("onBeforeTaskDisplay", (id, task) => {
      // console.log(id)
      // return(task.parent === checkboxFilter)
      return compareInput(id)

      // return task.parent == id
    })
    changeDetector()
  }
    
    // const updateFilters = (checked: boolean, checkboxFilter: string) => {
      // console.log(this.filtersContent)
      // console.log(typeof checkboxFilter)
      // console.log(!(checkboxFilter in this.filtersContent))
    // }
    
    
    // const changeDetector = () => {
    //   gantt.refreshData();
    // };
    
    // const compareInput = (id: string|number) =>{
    //     let match = false
    //     // console.log(gantt
    //       // .getTask(id).text)
    //     // console.log(this.filtersContent)
    //     // console.log(gantt.getTask(id).parent)
    //     // console.log(gantt.getTask(id).parent)
    //     if (gantt.getTask(id).parent!.toString() in this.filtersContent){
    //       match = true
    //     }
    //     // gantt.refreshData()
    //     return match
    // }
    
    // gantt.attachEvent("onBeforeTaskDisplay", (id, task)=>{
      // return true
      // gantt.refreshData()
      // return compareInput(id) ? true : false

        // if (gantt.getTask(id) in this.filtersContent)
      
    // })
    
    // changeDetector()
    // gantt.refreshData()
    // updateFilters(checked, checkboxFilter)
  
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

  // public onSearchChange = (): void => {
  //   let searchBox = document.getElementById('filter');
  //   console.log((searchBox! as HTMLInputElement).value);
  // };
  
  public filterInput = () => {
    let filterData: string;
    let searchBox = document.getElementById('filter');

    gantt.attachEvent('onDataRender', () => {
      searchBox = document.getElementById('filter');
    });

    const changeDetector = () => {
      filterData = (searchBox! as HTMLInputElement).value;
      gantt.refreshData();
    };

    const compareInput = (id: string | number) => {
      let match = false;
    
      // Check if the task's text matches the filter data
      if (gantt
          .getTask(id)
          .text.toLowerCase()
          .indexOf(filterData.toLowerCase()) >= 0
          ) {
          match = true;
      }
    
      // If the task has children, check if any child matches the filter data
      if (gantt.hasChild(id)) {
        gantt.eachTask((childObject) => {
          if (gantt
              .getTask(childObject.id)
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
