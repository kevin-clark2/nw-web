var UpdateEventWindow;

/**
 * This method is used to popup the update window
 * 
 * @param url          the servlet url
 * @param id           the id of the event being updated
 * @param eventduedate the due date of the event
 * @param timezone     the timezone selected on the page
 * @param time         the time field which specifies whether the event
 *                     is all day or not
 * @param duedatehrs   the due date hours
 * @param duedatemin   the due date minutes
 * @param duedatemonth the due date month
 * @param duedateday   the due date day
 * @param duedateyear  the due date year
 */
function updateRecursive(url,
                         id,
                         eventduedate,
                         timezone,
                         time,
                         duedatehrs,
                         duedatemin,
                         duedatemonth,
                         duedateday,
                         duedateyear){

   var posX = (screen.width-400)/2;
   var posY = (screen.height-150)/2;


   string = "UpdateEventWindow = window.open('" + url + "?op=CalendarModule.UpdateRecursivePopupOperation";
   string =  string + "&ID=" + id + "&eventDueDate="  + escape(eventduedate) + "&timeZone=";
   string = string + timezone + "&time=" + time + "&duedateHrs=" + duedatehrs;
   string = string + "&duedateMin=" + duedatemin + "&duedateMonth=" + duedatemonth + "&duedateDay=";
   string = string + duedateday + "&duedateYear=" + duedateyear;
   string = string + "','UpdateEventWindow', 'resizable=no,scrollbars=no,status=0,width=" + 400 +",height=" + 150 + ",left="+posX + ",top=" + posY + "');UpdateEventWindow.focus();";
  
   setTimeout(string, 250);
}

/**
 * Thi method is used to close the update window
 */
function updateCleanup(){
   if((UpdateEventWindow) && (!UpdateEventWindow.closed))
      UpdateEventWindow.close();
}
