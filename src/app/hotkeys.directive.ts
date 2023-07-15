import { AfterViewInit, Directive } from '@angular/core';
import { gantt } from 'opt/gantt_pro/codebase/dhtmlxgantt';

@Directive({
  selector: '[appHotkeys]'
})
export class HotkeysDirective implements AfterViewInit {

  ngAfterViewInit(): void {
    // document.addEventListener('keyup', (event) => {
    //     if (event.ctrlKey && event.key === 'x') {
    //         gantt.undo();
    //     }
    // });
    
    // document.addEventListener('keyup', (event) => {
    //     if (event.ctrlKey && event.key === 'y') {
    //         gantt.redo();
    //     }
    // });
  
    // document.addEventListener('keyup', (event) =>{
    //     if (event.key == "Escape"){
    //       gantt.hideLightbox();
    //     }
    // })
  
    // document.addEventListener('click', (e)=>{
    //     if ((e.target as Element).className === "gantt_cal_cover"){
    //         gantt.hideLightbox()
    //     }
    // })
  }

}