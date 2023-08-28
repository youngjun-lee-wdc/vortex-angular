import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  dateForm: FormGroup
  darkMode: boolean;
  themeForm: FormGroup

  constructor(fb: FormBuilder){
    this.servers = []
    this.filtersWrapper = document.getElementById("filtersWrapper")
    this.filtersInputs = this.filtersWrapper?.getElementsByTagName("input")
    this.filtersContent = {}
    this.levels = {}
    this.dateForm = fb.group({
      dateZoom: ['Week', Validators.required]
    })
    this.darkMode = false;
    this.themeForm = fb.group({
      theme: ['terrace', Validators.required]
    })
    
  }
  ngOnInit(){
    this.getFiltersContent();
    // this.toggleDarkMode()
    // const localStorageTheme = localStorage.getItem("theme")
    // console.log(localStorageTheme)
  }
  
  public getFiltersContent(){
    gantt.attachEvent("onAfterTaskUpdate",  (id, task) => {
      this.filtersContent[task.id] = {id: task.id, parent: task.parent}
      this.levels[id] = true
    })
  }

  public dateUpdate(){
    console.log(this.dateForm.value.dateZoom)
    
    gantt.ext.zoom.setLevel(this.dateForm.value.dateZoom)
    gantt.showDate(new Date(Date.now() - ( 1* 3600 * 1000 * 24))); 
  }

  public toggleDarkMode = () : void =>{

    let skinElement = document.querySelector("#themeSkin") as HTMLLinkElement
    console.log(skinElement)
    skinElement.href= `./assets/dhtmlxgantt_${this.themeForm.value.theme}.css`
    this.darkMode = !this.darkMode
    localStorage.setItem("theme", this.themeForm.value.theme)
    gantt.render()
  }
  
  public switchUpdated = (checkbox: any) => {
    // filter tasks by CPUs
    gantt.refreshData()
    const checked = checkbox.target.checked;
    const checkboxFilter = checkbox.target.name
    this.levels[checkboxFilter] = checked
    
    gantt.attachEvent("onBeforeTaskDisplay", (id, task) => {
      
      if (!task.id.startsWith("vm")){
        if (id in this.levels){
          return this.levels[id]
        }
        return true
      }
      return false
    })
    gantt.refreshData()

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

  public fullscreen = (): void =>{
    if (!gantt.getState().fullscreen){
      gantt.expand();
    }
    else{
      gantt.collapse();
    }
  }

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
