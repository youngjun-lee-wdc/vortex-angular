import { Directive } from '@angular/core';
import { gantt } from 'dhtmlx-gantt';
@Directive({
  selector: '[appMinimap]'
})
export class MinimapDirective {

  public miniGantt: any
  // let miniGantt = null;

  constructor() {
    this.miniGantt = null
  }


//   private toggleMinimap() {
//     if (this.miniGantt) {
//         this.miniGantt.destructor();
//         this.miniGantt = null;
//         let oldMinimapContainer = document.querySelector("#minimap");
//         if (oldMinimapContainer) {
//             oldMinimapContainer.parentNode!.removeChild(oldMinimapContainer)
//         }
//     }
//     else {
//         this.addMiniMap()
//     }
// }


//   applyConfig(config: any, dates:any) {
//         if (config.scales[0].date) {
//             this.miniGantt.templates.date_scale = null;
//         }
//         else {
//             this.miniGantt.templates.date_scale = config.scales[0].template;
//         }

//         this.miniGantt.config.scales = config.scales;

//         if (dates && dates.start_date && dates.start_date) {
//             this.miniGantt.config.start_date = this.miniGantt.date.add(dates.start_date, -1, config.scales[0].unit);
//             this.miniGantt.config.end_date = this.miniGantt.date.add(this.miniGantt.date[config.scales[config.scales.length - 1].unit + "_start"](dates.end_date), 2, config.scales[0].unit || 1);
//         } else {
//             this.miniGantt.config.start_date = this.miniGantt.config.end_date = null;
//         }

//         if (config.zoom_level) this.miniGantt.ext.zoom.setLevel(config.zoom_level);
//     }
//   zoomToFit() {
//         const project = this.miniGantt.getSubtaskDates(),
//             areaWidth = this.miniGantt.$task.offsetWidth;
//         const scaleConfigs = zoomConfig.levels

//         let zoomLevel = 0;
//         for (let i = 0; i < scaleConfigs.length; i++) {
//             zoomLevel = i;
//             const level = scaleConfigs[i].scales;
//             const lowestScale = level[level.length - 1]
//             const columnCount = getUnitsBetween(project.start_date, project.end_date, lowestScale.unit, lowestScale.step || 1);
//             if ((columnCount + 2) * miniGantt.config.min_column_width <= areaWidth) {
//                 break;
//             }
//         }

//         if (zoomLevel == scaleConfigs.length) {
//             zoomLevel--;
//         }

//         applyConfig(scaleConfigs[zoomLevel], project);
//         miniGantt.render();
//     }

//     // get number of columns in timeline
//     function getUnitsBetween(from, to, unit, step) {
//         let start = new Date(from),
//             end = new Date(to);
//         let units = 0;
//         while (start.valueOf() < end.valueOf()) {
//             units++;
//             start = miniGantt.date.add(start, step, unit);
//         }
//         return units;
//     }
// addMiniMap() {
//     this.miniGantt = gantt;
//     this.miniGantt.config.show_task_cells = false;

//     this.miniGantt.config.readonly = true;
//     this.miniGantt.config.drag_progress = false;
//     this.miniGantt.config.show_links = false;
//     this.miniGantt.config.row_height = 1;
//     this.miniGantt.config.min_column_width = 2;
//     this.miniGantt.config.scale_height = 0;

//     this.miniGantt.config.layout = {
//         css: "gantt_container",
//         rows: [
//             {
//                 cols: [
//                     {
//                         view: "timeline",
//                         scrollX: "scrollHor",
//                         scrollY: "scrollVer"
//                     },
//                     {
//                         view: "scrollbar",
//                         id: "scrollVer"
//                     }
//                 ]
//             },
//             {
//                 view: "scrollbar",
//                 id: "scrollHor"
//             }
//         ]
//     }


//     this.miniGantt.plugins({
//         tooltip: true
//     })
//     this.miniGantt.ext.tooltips.tooltip.setViewport(this.miniGantt.$task_data);


//     // zoom to fit
//     const zoomConfig = {
//         levels: [
//             {
//                 name: "day",
//                 scales: [
//                     { unit: "day", step: 1, format: "%d %M" }
//                 ]
//             },
//             {
//                 name: "week",
//                 scales: [
//                     { unit: "week", format: "Week #%W" }
//                 ]
//             },
//             {
//                 name: "month",
//                 scales: [
//                     { unit: "month", step: 1, format: "%M" },
//                 ]
//             },
//             {
//                 name: "year",
//                 scales: [
//                     { unit: "year", step: 1, format: "%Y" }
//                 ]
//             }
//         ],
//         element: function () {
//             return miniGantt.$root.querySelector(".gantt_task");
//         }
//     };

//     this.miniGantt.ext.zoom.init(zoomConfig);



//     ///


//     const minimapContainer = document.createElement("div");
//     minimapContainer.id = "minimap";
//     document.body.appendChild(minimapContainer);

//     miniGantt.init("minimap");
//     miniGantt.$container.parentNode.draggable = false;
//     const ganttTasks = JSON.stringify(gantt.serialize());
//     miniGantt.parse(ganttTasks);

//     const minimalRowSize = miniGantt.$container.offsetHeight / miniGantt.getTaskCount();
//     miniGantt.config.bar_height =
//         miniGantt.config.row_height = Math.max(Math.floor(minimalRowSize), 1);

//     zoomToFit();

//     const minimapDrag = document.createElement("div");
//     minimapDrag.className = "minimap_drag";
//     minimapDrag.draggable = false;
//     minimapDrag.style.left = "0px";
//     minimapDrag.style.width = Math.max((gantt.$task.offsetWidth / gantt.$task.scrollWidth * miniGantt.$task.offsetWidth), 20) + "px";
//     minimapDrag.style.top = "0px";
//     minimapDrag.style.height = Math.max((gantt.$task.offsetHeight / gantt.$task_bg.scrollHeight * miniGantt.$task.offsetHeight), 20) + "px";
//     miniGantt.$container.appendChild(minimapDrag);


//     miniGantt.dragMiniGantt = false;
//     miniGantt.dragActualGantt = false;
//     let initialDragPosition = null;
//     let initialScroll = miniGantt.getScrollState()
//     window.addEventListener('mousedown', function (e) {
//         if (miniGantt) {
//             miniGantt.dragMiniGantt = true;
//             const minimapElement = miniGantt.utils.dom.closest(e.target, ".minimap_drag");

//             if (dragInsideContainer(e, miniGantt.$container)) {
//                 initialScroll = miniGantt.getScrollState();
//             }
//             if (minimapElement && dragInsideContainer(e, minimapElement)) {
//                 miniGantt.dragActualGantt = true;
//                 minimapDrag.style.pointerEvents = "none";
//             }
//         }
//     });

//     window.addEventListener('mouseup', function (e) {
//         if (miniGantt) {
//             miniGantt.dragMiniGantt = false;
//             miniGantt.dragActualGantt = false;
//             initialDragPosition = null;
//             minimapDrag.style.pointerEvents = "all";
//         }
//     });

//     function dragInsideContainer(e, container) {
//         const dragPos = miniGantt.utils.dom.getRelativeEventPosition(e, container);

//         const insideX = 0 <= dragPos.x && dragPos.x <= container.offsetWidth
//         const insideY = 0 <= dragPos.y && dragPos.y <= container.offsetHeight
//         if (insideX && insideY) {
//             return true;
//         }
//     }

//     function scrollMiniGantt() {
//         if (!miniGantt) {
//             return
//         }
//         const scrollOffset = 20;

//         const newScrollPosition = miniGantt.getScrollState();
//         const leftBorder = miniGantt.dragPositionX - scrollOffset / 2;
//         const rightBorder = miniGantt.dragPositionX - (miniGantt.$task.offsetWidth - scrollOffset);
//         const topBorder = miniGantt.dragPositionY - scrollOffset / 2;
//         const bottomBorder = miniGantt.dragPositionY - (miniGantt.$task_data.offsetHeight - scrollOffset);

//         let shouldScroll = false;
//         if (leftBorder < 0) {
//             newScrollPosition.x -= miniGantt.$task_data.scrollWidth / scrollOffset;
//             shouldScroll = true;
//         }
//         if (rightBorder > 0) {
//             newScrollPosition.x += miniGantt.$task_data.scrollWidth / scrollOffset;
//             shouldScroll = true;
//         }
//         if (topBorder < 0) {
//             newScrollPosition.y -= miniGantt.$task_data.scrollHeight / scrollOffset;
//             shouldScroll = true;
//         }
//         if (bottomBorder > 0) {
//             shouldScroll = true;
//             newScrollPosition.y += miniGantt.$task_data.scrollHeight / scrollOffset;
//         }

//         if (shouldScroll) {
//             miniGantt.scrollTo(newScrollPosition.x, newScrollPosition.y);
//             setTimeout(function () {
//                 scrollMiniGantt()
//             }, 4)
//         }

//     }

//     miniGantt.attachEvent("onMouseMove", function (id, e) {
//         if (miniGantt.dragActualGantt) {
//             const position = miniGantt.utils.dom.getRelativeEventPosition(e, miniGantt.$task_data);
//             const taskRow = miniGantt.utils.dom.closest(e.target, "[data-task-id]")

//             if (taskRow) {
//                 const relativePosition = miniGantt.utils.dom.getRelativeEventPosition(e, miniGantt.$container);

//                 miniGantt.dragPositionX = relativePosition.x - minimapDrag.offsetWidth / 2;
//                 miniGantt.dragPositionY = relativePosition.y - minimapDrag.offsetHeight / 2;

//                 const id = taskRow.dataset.taskId;
//                 const x = gantt.posFromDate(miniGantt.dateFromPos(position.x)) - gantt.$task.offsetWidth / 3;
//                 const y = gantt.getTaskPosition(gantt.getTask(id)).top - gantt.$task.offsetHeight / 3;

//                 minimapDrag.style.left = (miniGantt.dragPositionX) + "px";
//                 minimapDrag.style.top = (miniGantt.dragPositionY) + "px";

//                 gantt.scrollTo(x, y);

//                 scrollMiniGantt(miniGantt.dragPositionX, miniGantt.dragPositionY)
//             }
//         }

//         else if (miniGantt.dragMiniGantt && dragInsideContainer(e, miniGantt.$container)) {
//             const dragPos = miniGantt.utils.dom.getRelativeEventPosition(e, miniGantt.$container);
//             initialDragPosition = initialDragPosition || dragPos;
//             const percentX = (initialDragPosition.x - dragPos.x) / miniGantt.$container.scrollWidth;
//             const percentY = (initialDragPosition.y - dragPos.y) / miniGantt.$container.scrollHeight;

//             const positionPercentX = percentX * miniGantt.$task_bg.scrollWidth;
//             const positionPercentY = percentY * miniGantt.$task_bg.scrollHeight;

//             const newPositionX = initialScroll.x + positionPercentX
//             const newPositionY = initialScroll.y + positionPercentY

//             miniGantt.scrollTo(newPositionX, newPositionY)
//         }
//     });

//     miniGantt.attachEvent("onEmptyClick", function (e) {
//         const position = miniGantt.utils.dom.getRelativeEventPosition(e, miniGantt.$task_data);
//         const taskRow = miniGantt.utils.dom.closest(e.target, "[data-task-id]")
//         if (taskRow) {
//             const id = taskRow.dataset.taskId;
//             const y = gantt.getTaskPosition(gantt.getTask(id)).top;
//             const x = gantt.posFromDate(miniGantt.dateFromPos(position.x));
//             gantt.scrollTo(x, y);
//         }
//     });
//     miniGantt.attachEvent("onTaskClick", function (id, e) {
//         gantt.showTask(id);
//     });



// }

}
