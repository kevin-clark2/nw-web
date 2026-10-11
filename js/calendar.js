
var emailCalendarWindow;
/**
 * This method is used to send an email of the calendar
 * 
 * @param url          the servlet url
 * @param startLong    the long value of the start date
 * @param endLong      the long value of the end date
 * @param calendarType the calendarView he is on (Personal, org. or proxy calendar)
 * @param operation    the the operation it is comming from
 */
function emailCalendar(url, startLong, endLong, calendarType, operation){
   //used for position of the window being opened
   var posX = (screen.width-400)/2;
   var posY = (screen.height-400)/2;

   //generation of the url to open the window
   string = "emailCalendarWindow = window.open('" + url + "?op=CalendarModule.EmailCalendarOperation&startLong=" + startLong;
   string = string + "&endLong=" + endLong + "&ct=" + escape(calendarType) + "&calendarView=" + operation;
   string += "', 'emailCalendarWindow','resizable=no,scrollbars=no,status=0,width=500,height= 425,left="+posX + ",top=" + posY +")'); emailCalendarWindow.focus();";

   setTimeout(string, 250);
}

/**
 * This method is used to set the values in the parent window 
 * for creating the bridge.
 * 
 * @param url      the servlet url
 * @param ro       the return operation
 * @param type     the event type to be created
 * @param longDate the date in milliseconds. Optional. If it is not
 *                 present it will take the current date/time
 * @param rm       An optional field with the return module to go to.
 *                 By default it is the calendar module
 * @param assignee the assignees entitiy identifier keys seperated by
 *                 comma, this is an optional value.
 * @param ct       An optional calendar type to go to.
 */
function createBridge(url, ro, type, longDate, rm, assignee, ct){
   
   string = url + '?op=CalendarModule.CreateBridgeOperation&ro=' + ro + '&type=' + type;
   
   if(rm == null)
      rm = 'CM';
   string += '&rm=' + rm;

   if(ct != null)
      string += '&ct=' + ct;
   
   if(longDate != null)
      string += '&calendarLongValue=' + longDate;

   if(assignee != null && trim(assignee) != '')
      string += '&assignee=' + assignee;
   
   this.location= string;
}

/**
 * This method is used to set the values in the parent
 * window for creating the bridge.
 * 
 * @param url      the servlet url
 * @param ro       the return operation
 * @param type     the event type to be created
 * @param longDate the date in milliseconds. Optional. If it is not
 *                 present it will take the current date/time
 * @param rm       An optional field with the return module to go to.
 *                 By default it is the calendar module
 * @param assignee list of assignee entityidentifier keys seperated by
 *                 comma
 * @param pname    page name
 */
function createBridgeFromContacts(url, ro, type, longDate, rm, assignee, pname){
   
   string = url + '?op=CalendarModule.CreateBridgeOperation&ro=' + ro + '&type=' + type;
   
   if(rm == null)
      rm = 'CM';
   string += '&rm=' + rm;
   
   if(assignee != null && trim(assignee) != '')
      string += '&assignee=' + assignee;
   
   if(longDate != null)
      string += '&calendarLongValue=' + longDate;

   if(pname != null)
      string += '&pname=' + pname;

   this.location= string;
}

/**
 * This method is used to clean up the open window
 **/
function emailCalendarWindowCleanup(){
   if((emailCalendarWindow) && (!emailCalendarWindow.closed))
     emailCalendarWindow.close();
}

/**
 * Method to go the view of a particular date in calendar
 * when a day is clicked on small months
 * 
 * @param url the url servlet url
 * @param op  the operation in calendar module to go to
 * @param d   day of the date selected
 * @param m   month of the date selected
 * @param y   year of the date selected
 * @param ct  the type of calendar (i.e.. personal, org or proxy
 *            calendar) presentrly viewing
 */
function sm(url,op,d,m,y,ct){
   this.location=url+'?op=CM.'+op+'&day='+d+'&month='+m+'&year='+y+'&ct='+ct;
}



