import { CUSTOM_ELEMENTS_SCHEMA, NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
// import { MatNativeDateModule } from '@angular/material/'


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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotkeyDirective } from './hotkey.directive';
import { LightboxComponent } from './lightbox/lightbox.component';
import { LightboxDirective } from './lightbox.directive';
import { LightboxDataService } from './lightbox-data.service';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  declarations: [
    AppComponent,
    GanttComponent,
    MarkerDirective,
    HotkeysDirective,
    TooltipDirective,
    ZoomDirective,
    ToolbarComponent,
    HotkeyDirective,
    LightboxComponent,
    LightboxDirective,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
    AccordionModule.forRoot(),
    NgxDaterangepickerMd.forRoot(),
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [LightboxDataService],
  bootstrap: [AppComponent],
})
export class AppModule { }
                           