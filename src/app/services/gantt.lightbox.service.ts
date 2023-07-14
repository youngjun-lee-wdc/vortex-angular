import { GanttStatic, Calendar, Task } from 'dhtmlx-gantt';


declare const dhtmlXCalendarObject: any


export function GanttLightbox(gantt: GanttStatic): void{
    
    var duration = function (a: { getDate: (arg0: boolean) => Date | { start_date: Date; end_date: Date; task?: Task | undefined; }; }, b: { getDate: (arg0: boolean) => Date | undefined; }, c: { innerHTML: string; }) {
        var res = gantt.calculateDuration(a.getDate(false), b.getDate(false));
        c.innerHTML = res + ' days';
    };

    var calendar_init = function (id: string, data: { date_format: any; skin: any; }, date: any) {
        var obj = new dhtmlXCalendarObject(id);
        obj.setDateFormat(data.date_format ? data.date_format : '');
        obj.setDate(date ? date : (new Date()));
        obj.hideTime();
        if (data.skin)
            obj.setSkin(data.skin);
        return obj;
    };

    gantt['form_blocks']["dhx_calendar"] = {
        render: function (sns: any) {
            return "<div class='dhx_calendar_cont'><input type='text' readonly='true' id='calendar1'/> &#8211; "
                + "<input type='text' readonly='true' id='calendar2'/><label id='duration'></label></div>";
        },
        set_value: function (node: { _cal_start: any; _cal_end: any; lastChild: any; }, value: any, task: { start_date: any; end_date: any; }, data: { date_format: any; skin: any; }) {
            var a = node._cal_start = calendar_init('calendar1', data, task.start_date);
            var b = node._cal_end = calendar_init('calendar2', data, task.end_date);
            var c = node.lastChild;

            b.setInsensitiveRange(null, new Date(a.getDate(false) - 86400000));

            var a_click = a.attachEvent("onClick", function (date: { getTime: () => number; }) {
                b.setInsensitiveRange(null, new Date(date.getTime() - 86400000));
                duration(a, b, c);
            });

            var b_click = b.attachEvent("onClick", function (date: any) {
                duration(a, b, c);
            });

            var a_time_click = a.attachEvent("onChange", function (d: { getTime: () => number; }) {
                b.setInsensitiveRange(null, new Date(d.getTime() - 86400000));
                duration(a, b, c);
            });

            var b_time_click = b.attachEvent("onChange", function (d: any) {
                duration(a, b, c);
            });


            var id = gantt.attachEvent("onAfterLightbox", function () {
                a.detachEvent(a_click);
                a.detachEvent(a_time_click);
                a.unload();
                b.detachEvent(b_click);
                b.detachEvent(b_time_click);
                b.unload();
                a = b = null;
                gantt.detachEvent(id);
            });
            const calendar1 = <HTMLInputElement>document.getElementById('calendar1');
            const calendar2 = <HTMLInputElement>document.getElementById('calendar2');
            if (calendar1 && calendar2){
                calendar1.value = a.getDate(true);
                calendar2.value = b.getDate(true);
            }
            duration(a, b, c);
        },
        get_value: function (node: { _cal_start: { getDate: (arg0: boolean) => any; }; _cal_end: { getDate: (arg0: boolean) => any; }; }, task: { start_date: any; end_date: any; }) {
            task.start_date = node._cal_start.getDate(false);
            task.end_date = node._cal_end.getDate(false);
            return task;
        },
        focus: function (node: any) {
        }
    };
    
    gantt.attachEvent("onBeforeLightbox", (task_id) => {
        const userOptions: string | any[] = []
        gantt.eachTask((task) => {
            const userWriteIn = task.section_test_plan_writein
            const userDropdownOption = task.section_test_plan_dropdown
            if (userWriteIn && !(userOptions.includes(userWriteIn))){
                userOptions.push(userWriteIn)
            }
            if (userDropdownOption && !(userOptions.includes(userDropdownOption))){
                userOptions.push(userDropdownOption)
            }
            if (userOptions.includes("NaN")){
                userOptions.splice(userOptions.indexOf("NaN"), 1)
            }
        })

        const uniqueOptions = []
        for (let i=0; i<userOptions.length; i++){
            uniqueOptions.push({
                key: userOptions[i],
                label: userOptions[i]
            })
        }

        const ganttTask = gantt.getTask(task_id)
        const ganttTaskParent = gantt.getTask(ganttTask.parent!)
        const ganttTaskGrandParent = gantt.getTask(ganttTaskParent.parent!)
        const dutOptions = gantt.serverList(ganttTaskGrandParent.text)
        gantt.resetLightbox()
        gantt.config.lightbox.sections = [
            {name: "test", height:22, map_to:"text", type:"select", options:dutOptions},
            {name: "FW_version",height:22, map_to:"FW_version", type:"select", options:gantt.serverList("availablefirmwares")},
            {name: "test_plan_dropdown", height:22, map_to:"test_plan_dropdown", type:"select", options: uniqueOptions},
            {name: "test_plan_writein", height:22, map_to:"test_plan_writein", type:"textarea"},
            {name: "time", type: "dhx_calendar", map_to: "auto", skin: '', date_format: '%Y-%m-%d %H:%i'},
        ]
        const userWriteIn = gantt.getLightboxSection('test_plan_writein')
        if(userWriteIn.getValue() === "NaN"){
            userWriteIn.setValue('');
        }
    
        const userDropdownOption = gantt.getLightboxSection('test_plan_dropdown');
        userDropdownOption.node.onclick = function () {
            const writein = gantt.getLightboxSection('test_plan_writein');
            //console.log(writein.getValue())
            writein.setValue('');
        }
        return true;
    })
    
    // scroll to current date when lightbox is cancelled
    gantt.attachEvent("onLightboxCancel", () => {
        gantt.showDate(new Date(Date.now() - ( 1* 3600 * 1000 * 24))); 
    });
    
    // frontend check, ie. if testsuite isnt specified, gonna return a warning and not allow save to occur
    gantt.attachEvent("onLightboxSave", (_, item) => {
        if(!item.text){
            gantt.message({type:"warning", text:"Please Select a Test Suite"});
            return false;
        }
        return true;
    });



}