import { GanttStatic } from 'dhtmlx-gantt';

export function GanttHotkeys(gantt: GanttStatic): void{
    document.addEventListener('keyup', (event) => {
        if (event.ctrlKey && event.key === 'x') {
            gantt.undo();
        }
    });
    
    document.addEventListener('keyup', (event) => {
        if (event.ctrlKey && event.key === 'y') {
            gantt.redo();
        }
    });
  
    document.addEventListener('keyup', (event) =>{
        if (event.key == "Escape"){
          gantt.hideLightbox();
        }
    })
  
    document.addEventListener('click', (e)=>{
        if ((e.target as Element).className === "gantt_cal_cover"){
            gantt.hideLightbox()
        }
    })
}