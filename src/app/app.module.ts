import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GanttComponent } from './gantt/gantt.component';
import { MarkerDirective } from './marker.directive';
import { HotkeysDirective } from './hotkeys.directive';
import { TooltipDirective } from './tooltip.directive';
import { ZoomDirective } from './zoom.directive';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { FormsModule } from '@angular/forms';
import { LightboxDirective } from './lightbox.directive';
import { HotkeyDirective } from './hotkey.directive';

@NgModule({
  declarations: [
    AppComponent,
    GanttComponent,
    MarkerDirective,
    HotkeysDirective,
    TooltipDirective,
    ZoomDirective,
    ToolbarComponent,
    LightboxDirective,
    HotkeyDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
    AccordionModule.forRoot(),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
                           