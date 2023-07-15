import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GanttComponent } from './gantt/gantt.component';
import { MarkerDirective } from './marker.directive';
import { HotkeysDirective } from './hotkeys.directive';
import { TooltipDirective } from './tooltip.directive';
import { ZoomDirective } from './zoom.directive';

@NgModule({
  declarations: [
    AppComponent,
    GanttComponent,
    MarkerDirective,
    HotkeysDirective,
    TooltipDirective,
    ZoomDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
