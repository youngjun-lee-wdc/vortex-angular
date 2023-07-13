import { GanttStatic } from 'dhtmlx-gantt';
import { minutesToTime } from '../HelperFunctions';


interface tooltipsFormat {
    [key: string]: {
        TestSuite?: string;
        TestPlan?: string;
        Firmware?: string;
        StartTime?: string;
        Duration?: string;
        Status?: string;
        DriveProgram?: string;
        Capacity?: string;
        SerialNumber?: string | number;
        Server?: string;
        Location?: string;        
    }
}


const testObject: tooltipsFormat = {
    "key":{
        TestSuite: "test"
    }
}

export function GanttTooltips(gantt: GanttStatic): void{
    gantt.templates.tooltip_text = (start, end, task) => {
        const tooltips_data: tooltipsFormat = {
           "3":{
                TestSuite: task.text,
                TestPlan: task['test_plan_dropdown'],
                Firmware: task['FW_version'],
                StartTime: gantt.templates.tooltip_date_format(start),
                Duration: minutesToTime(gantt.calculateDuration({start_date: start, end_date: end, task})),
                Status: task['status'],
            },
            "2":{
                DriveProgram: task.text.split("-")[0],
                Capacity: task.text.split("-")[1],
                Firmware: task.text.split("-")[2],
                SerialNumber: task.id,
            },
            "1":{
                Server: task.text,
            },
            "0":{
                Location: task.text,
            }
        }
  
        let table  = "<table>"
        const level = task.$level
        if (level){
            for (let [key, value] of Object.entries(tooltips_data[level])){
              table += `<tr><td><b>${key}</b></td><td>: <td>${value}</td></tr>`
            }
        }
        return table += "</table>"
      };
  
    gantt.config.columns=[
        { 
            name:"text", label:"Tests",  tree:true , width: "*",
            template: (task) => {
                if (task.text.includes("VM-")){
                    return "<div style = 'direction:rtl; text-align: center; overflow: hidden'>"+task.text+"</div>"
                }
                return task.text
            }
        },
        {name:"add", label:"" },
    ];
}