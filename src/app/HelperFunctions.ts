export const minutesToTime = (minutes:number) => {
    // when you're shrinking the time period of a task, it converts the time period going from days to hours to minutes depending on size 
    const formattedDays = Math.floor(minutes / 24 / 60);
    const formattedHours = Math.floor(minutes / 60 % 24);
    const formattedMinutes = minutes % 60;
    
    if (formattedDays != 0){
        return formattedDays + " days " + formattedHours + " hours " + formattedMinutes + " minutes" ;
    }
    else if (formattedHours != 0){
        return formattedHours + " hours " + formattedMinutes + " minutes" ;
    }    
    return formattedMinutes + " minutes" ;
  };