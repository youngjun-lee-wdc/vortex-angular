import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GanttComponent } from './gantt/gantt.component';

import { LightboxComponent } from './lightbox/lightbox.component';
import { MarkerDirective } from './marker.directive';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TooltipDirective } from './tooltip.directive';
import { ZoomDirective } from './zoom.directive';
import { MinimapDirective } from './minimap.directive';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    GanttComponent,
    LightboxComponent,
    ToolbarComponent,

    MarkerDirective,
    TooltipDirective,
    ZoomDirective,
    MinimapDirective,
    LoginComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
    NgxDaterangepickerMd.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
                           