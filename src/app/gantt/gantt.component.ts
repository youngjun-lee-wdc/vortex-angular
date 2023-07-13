import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { TaskService } from '../services/task.service';
import { LinkService } from '../services/link.service';
import { GanttConfig } from '../services/gantt.init.service';
import { GanttMarker } from '../services/gantt.marker';
import { gantt } from 'dhtmlx-gantt';
import { GanttZoom } from '../services/gantt.zoom.service';
import { GanttHotkeys } from '../services/gantt.hotkeys.service';
import { GanttTooltips } from '../services/gantt.tooltips.service';


// import { GanttStatic, Gantt } from 'dhtmlx-gantt';
// let gantt: GanttStatic;


@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'gantt',
    styleUrls: ['./gantt.component.css'],
    // templateUrl: './gantt.component.html',
    providers: [TaskService, LinkService],
    templateUrl : './gantt.component.html',
})

export class GanttComponent implements OnInit, OnDestroy {
    @ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;

    ngOnInit() {
        gantt.plugins({
            auto_scheduling: true,
            tooltip: true,
            drag_timeline: true,
            marker: true,
            undo: true,
            fullscreen: true,
            export_api: true
        })

        GanttConfig(gantt)
        GanttMarker(gantt)
        GanttZoom(gantt)
        GanttHotkeys(gantt)
        GanttTooltips(gantt)

        gantt.init(this.ganttContainer.nativeElement);

        gantt.load("http://localhost:3000/data")
        const dp = gantt.createDataProcessor({
            // url: "http://137.135.48.130:3000/data",
            url: "http://localhost:3000/data",
            mode: "REST"
        });
        dp.init(gantt);
    }

    ngOnDestroy(): void{
        gantt.destructor();
    }
}