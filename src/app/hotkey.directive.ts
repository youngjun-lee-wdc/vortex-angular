import { Directive, ElementRef, HostListener } from '@angular/core';
import { gantt } from 'opt/gantt_pro/codebase/dhtmlxgantt';

@Directive({
  selector: '[appHotkey]'
})
export class HotkeyDirective {

  // constructor(private elementRef: ElementRef) { }

  // @HostListener('keypress', ['$event']) onKeyDown(e: { ctrlKey: any; key: string; shift: any; }) {
  //   if (e.ctrlKey && e.key === 'z') {
  //     console.log('undo')
  //     gantt.undo()
  //   }
  //   if (e.ctrlKey && e.shift &&e.key ==='z'){
  //     gantt.redo()
  //   }
  // }
  // @HostListener('keydown.shift', ['$event'])
  // onKeyDown(e: { preventDefault: () => void; }) {
  //     // optionally use preventDefault() if your combination
  //     // triggers other events (moving focus in case of Shift+Tab)
  //     e.preventDefault();
  //     console.log('shift and tab');
  // }
}
