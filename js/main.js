//--------------------------------------Message object----------------------------------------------

/**
 * This method is used to add the given message to the
 * message object
 * 
 * @param msg the message to be added.
 */
function add(msg){
    this.msg += "* " + msg + "\n";

}

//Message headers to be shown when we call the message objec
MESSAGE_1 = "Please verify one or more of the following error(s):\n";
MESSAGE_2 = "You have not entered one or more of the required fields. The following is required:\n";


/**
 * This method is used to show the contents of the 
 * message object
 * 
 * @param heading the type of heading to be displayed
 */
function show(heading){
    if (heading == null)
        heading = MESSAGE_1;
    else if (heading == 1)
        heading = MESSAGE_1;
    else if (heading == 2)
        heading = MESSAGE_2;


    if (this.msg != "") {
        alert(heading + this.msg);
        return false;
    } else {
        return true;
    }
}

/**
 * Checks to see if there is an error alredy present
 */
function hasError(){
   if(this.msg == "")
      return false;
   else
      return true;
}

/*
*This function is used to create a new message for validation.
* Usage
* m = new Message()            - Creates a new message object
* m.add("The message to add")  - Adds a message to this object
* m.show([heading])            -
* Displayes the message with a default heading if [heading] is not present.
* If heading is 1 it shows the message "Please verify one or more of the following error(s):\n". (Default)
* If heading is 2 it shows the message "You have not entered one or more of the required fields. The following is required:\n"
* If heading is any other message it shows that message.
* It returns true if there is a message else it returns false.
*/
function Message(){
    this.msg = "";
    this.add = add;
    this.show = show;
    this.hasError = hasError;
}
//-------------------------------------End of Message Object -----------------------------

/**
 * This checks to see if the date is a valid date
 * 
 * @param yearField           the field containing the year of the date
 * @param monthField          the field containing month of the date
 * @param dateField           the field containting the day of the date
 * @param yearNotCompulsory   specifies whether year field is complusory or not.
 *                            If true then it is not compulsary
 * @param considerPresentYear pecifying whether to consider present year or not.
 *                            Can be null and if null, then takes considerPresentYear to be true
 * @return true if the date if valid, false other wise
 */
function isValidDate(yearField, monthField, dateField, yearNotCompulsory, considerPresentYear){

   var yearString = null;

   if (yearNotCompulsory != null && yearNotCompulsory) {

      if (considerPresentYear == null)
         considerPresentYear = true;

      var defaultYear = null;

      if (considerPresentYear) {
         d = new Date();
         defaultYear = d.getFullYear() + "";
      } else {
         defaultYear = "4";
      }

      if (yearField == null) {
         yearString = defaultYear;
      } else {
         yearString = trim(yearField.value);
         if (yearString == "")
            yearString = defaultYear;
      }

   } else {
      if (yearField == null)
         return false;
      else
         yearString = trim(yearField.value);
   }

   var monthVal = parseInt(monthField.value, 10);
   var dateVal  = parseInt(dateField.value, 10);
   var yearVal  = parseInt(yearString, 10);

    if (monthField == null || dateField == null ||
        trim(monthField.value) == "" || trim(dateField.value)== "" ||
        !isInteger(monthField.value) || !isInteger(dateField.value) || !isInteger(trim(yearString)))
        return false;

    var monthMax = new Array(31,28,31,30,31,30,31,31,30,31,30,31);

    if ( isLeapYear(yearVal) )
        monthMax[1] = 29;

    var topVal = monthMax[monthVal];
    if (!inRange(dateVal,1,topVal))
        return false;
    else
        return true;
}

/**
 * function to check if the year is a leap year or not.
 * 
 * @param year the year of the date that is to be checked
 * @return true if leap year else false
 */
function isLeapYear(year){
    if (year%4 == 0 && year%100 != 0) {
        return true;
    } else if (year%4 == 0 && year%100 == 0) {
        if (year%400 != 0)
            return false;
        else
            return true;
    }
}

/**
 * function to determine if value is in acceptable 
 * range for this application
 * 
 * @param num the number that is to be checked
 * @param lo  the lowest range that is allowed
 * @param hi  the highest range that is to be allowed
 * @return true if the number is in valid range else false
 */
function inRange(num, lo, hi) {
    if (num < lo || num > hi) {
        return false
    }
    return true
}

/**
 * This function checks to see if the given string is
 * a valid html or not.
 * 
 * @param str the string that is to be checked
 * @return true if valid html string, else false
 */
function isValidHtmlString(str){
   if(trim(str) == "")
      return true;
   if(str.indexOf("<") == -1 && str.indexOf(">") == -1 )
      return true;
   else
      return false;

}

//----------------------------------------------------------------------------------------------------

//XXX--Ravi, Commented out as the argument about displaying this warning has not yet been settled
/**
 * This method is used to show the warning when the user is trying to create an event in a timezone
 * different from the user defaultTimezone and the event is falling the date other than the intended
 * date on which he/sher is trying to create.
 *  for eg:- say a given user has a default timezone as CST and now the user is trying to create an
 *           event on say Jan 5th at 11.15pn PST and the event will show up on users calendar on
 *           Jan 6th at 1:15am as the user default timezone is CST even though techinically both are same.
 *           So this method, checks for this case and gives user warning about this.
 *
 * @param form the form name
 */
/*function sameDayWarning(form){

   //no timezone in consideration
   if(!form.udft || !form.timeZone)
      return true;

   var defaultTimezoneID = form.udft.value;

   var presentTimezoneString = form.timeZone.options[form.timeZone.selectedIndex].text;

   var i = 0;
   for(i=0; i < form.timeZone.options.length; i++){

      if(form.timeZone.options[i].value == defaultTimezoneID)
         break;
   }

   var defaultTimezoneString = form.timeZone.options[i].text;

   var presentTimezoneOffset = getTimezoneOffset(presentTimezoneString);
   var defaultTimezoneOffset = getTimezoneOffset(defaultTimezoneString);

   //if the event is not timed then just ignore it
   if(!form.duedateHrs)
      return true;

      var dHrs = 0;
      var dMin = 0;

      var maxTimeInDay = 24*60;

      //check if there is a checkbox for checking the time of the event
      if(form.dueDateTime){

         if(form.dueDateTime.checked){
              dHrs = form.duedateHrs.options[form.duedateHrs.selectedIndex].value;
              dMin = form.duedateMin.options[form.duedateMin.selectedIndex].value;
         }else{

              if(form.time){
                  dHrs = form.duedateHrs.options[form.duedateHrs.selectedIndex].value;
                  dMin = form.duedateMin.options[form.duedateMin.selectedIndex].value;
              } else
                 return true;
         }

      }else{

           dHrs = form.duedateHrs.options[form.duedateHrs.selectedIndex].value;
           dMin = form.duedateMin.options[form.duedateMin.selectedIndex].value;
      }


      var diffInOffset = (defaultTimezoneOffset - presentTimezoneOffset) * 60;

      var presentTimeInDay = ((parseInt(dHrs, 10)) * 60) + (parseInt(dMin, 10)) + diffInOffset;

      alert("offset diff   :" + (defaultTimezoneOffset - presentTimezoneOffset));
      alert("diffInOffset  :" + diffInOffset);
      alert("dHrs :" + dHrs);
      alert("dMin :" + dMin);

      alert("PresentTimeInDay :" + presentTimeInDay + "\n" + "maxTimeInDay :" + maxTimeInDay);

      if((presentTimeInDay < 0) || (presentTimeInDay >= maxTimeInDay)){

         confirm("Warning!!!!");
      }

      return false;


 }   */


//-----------------------------------------------------------------------------------------------------

/**
 * Function to trim the leading and trailing spaces of a string
 * 
 * @param argvalue the string that is to be trimmed
 * @return the trimmed string
 */
function trim(argvalue) {
    if (!argvalue) {
        return "";
    }

    var tmpstr = ltrim(argvalue);
    return rtrim(tmpstr);
}

/**
 * Function to trim the trailing spaces of a string
 * 
 * @param argvalue the String that is to be trimmed
 * @return the trimmed string
 */
function rtrim(argvalue) {
    while (1) {
        if (argvalue.substring(argvalue.length - 1, argvalue.length) != " ")
            break;
        argvalue = argvalue.substring(0, argvalue.length - 1);
    }
    return argvalue;
}

/**
 * Function to trim the leading spaces of the string
 * 
 * @param argvalue the string to be trimmed
 * @return the trimmed string
 */
function ltrim(argvalue) {
    while (1) {
        if (argvalue.substring(0, 1) != " ")
            break;
        argvalue = argvalue.substring(1, argvalue.length);
    }
    return argvalue;
}
/**
 * This method returns true if field is an integer only. 
 * 
 * @param val           The value to check for
 * @param allowNegative A optional boolean flag to allow negative numbers also.
 *                      If true it does not check for -ive
 * @return true if Integer else false
 */
function isInteger(val, allowNegative){
    var i = parseInt(val, 10);
    if ( allowNegative == null)
        allowNegative = false;


    if (isNaN(i) || i != val)
       return false;
    else if (val.indexOf(".") != -1)
        return false;
    else if (!allowNegative && val.indexOf("-") != -1)
        return false;
    else
        return true;
}

/**
 * This method returns true if field is a float . 
 * It returns fasle other wise.
 * 
 * @param val           The value to check for
 * @param allowNegative A optional boolean flag to allow negative numbers also.
 *                      If true it does not check for -ve
 * @return true if the value is a float else false
 */
function isFloat(val, allowNegative){
   var i = parseFloat(val, 0);
   if(allowNegative == null)
      allowNegative = false;

   if(i==0 || i != val)
      return false;
   else if (!allowNegative && val.indexOf("-") != -1)
        return false;
   else
      return true;
}

/**
 * Checks the size of the field. Returns true if it is
 *  shorter than length, false otherwise.
 * 
 * @param field  the field object whose content's length is checked
 * @param length the maximum length
 * @return true if the size of the field is shoter than the length
 */
function isLength(field, length){
    if (field.value.length <= length) {
        return true;
    } else {
        return false;
    }

}

/**
 * This method sets the particular field in the single select box to be highlighted.
 * 
 * @param selectField the selection field object
 * @param selectValue The value to set as selected in the selection field
 */
function setSelected(selectField, selectValue){
    for (var i=0; i < selectField.options.length;i++) {
        if (selectField.options[i].value == selectValue) {
            selectField.options[i].selected = true;
            break;
        }
    }
}

var fieldselectAllCheckbox = true;

/**
 * This method selectes or deselects all the checkboxes by acting like a toggle switch
 * If you have multiple sets of checkboxes, you can pass in the name of the
 * variable that will hold the state of the checkboxes.  But toggleVar is
 * optional.
 * 
 * @param checkboxField The check box field on the page to select or deselect.
 * @param toggleVar     this is the optional value to change the checkbox state
 *                      to the corresponding toogleVar state
 */
function selectAllCheckbox(checkboxField, toggleVar) {

    if (!toggleVar) {
        toggleVar = "fieldselectAllCheckbox";
    }

    var toggleValue = eval(toggleVar);

    if (checkboxField) {
        if (checkboxField[0]) {
            for (var i = 0 ;i < checkboxField.length; i++) {
                checkboxField[i].checked = toggleValue;
            }

            eval(toggleVar + '=' + !toggleValue);
            return;
        } else {
            checkboxField.checked = toggleValue;
            eval(toggleVar + '=' + !toggleValue);
            return;
        }
    }
}

/**
 * Returns true if one of the checkboxes are selected.
 * It returns true if there is no checkbox in the 
 * field.
 * 
 * @param checkBoxField The check box field to check
 */
function isSelectedCheckbox(checkBoxField){
    x = checkBoxField;
    if (x) {
        if (x[0]) {
            var field1 = false;
            for (var i=0; i<x.length; i++) {
                if (x[i].checked)
                    field1 = true;
            }
            if (!field1) {
                return false;
            }
        } else {
            if (!x.checked) {
                return false;
            }
        }
        return true;
    }
}

/**
 * Returns true if one of the checkboxes are selected. 
 * It returns true if there is no checkbox in the field.
 * 
 * @param checkBoxField The check box field to check
 */
function isSelectedCheckboxMulti(checkBoxField){
    x = checkBoxField;
    if (x) {
       var cnt = 0;
        if (x[0]) {
            for (var i = 0; i < x.length; i++) {
                if (x[i].checked)
                    ++cnt;
            }
            if (cnt > 1) {
                return true;
            }
        }
        return false;
    }
}

/**
 * This method is used to return the given date object
 * in GMT for a given timezone.
 * 
 * @param date   the Date Object.
 * @param offset the offset of the timezone from GMT
 *               for eg : for CST it would be -6.5
 * @return the date in GMT
 */
function getDateInGMT(date, offset){

   milliseconds = date.getTime();
   milliseconds = milliseconds - ( offset * 60 * 60 * 1000);

   gmtDate = new Date();
   gmtDate.setTime(milliseconds);
   date.setTime(milliseconds);

   return date;
}


//According to RFC 822 for validation of email
size = 75;
var seperatorExp = /([^\s\\\(\)\[\]<>;,:"]+|\([UATD]\))[:;,\s]*/g;
var emailExp = /([^\s\\\(\)\[\]<>;,:"@]+@[^\s\\\(\)\[\]<>;,:"]+)[:;,\s]*/;
var statusExp = /\([UATD]\)/;
emailExp.multiline = true;
/**
 * Checks if the email address is valid. It returns true
 * if there is nothing in the email field
 * 
 * @param emailField   the field that contains the email address that is
 *                     to be checked
 * @param retErrMsg    if true then it returns the error message or else
 *                     it returns false
 * @param ignoreStatus if true will ignore the status flag (A) (U) (T) (D). If false it will give these
 *                     flags as errors
 */

function isValidEmail(emailField, retErrMsg, ignoreStatus){

    emailStr = emailField.value;

    if (trim(emailStr) == "") {
        return true;
    }

    var tokens = emailStr.match(seperatorExp);

    for(var i=0; i< tokens.length; i++){
       mtch = tokens[i].match(emailExp);

       if(mtch == null){
         // check to see if this is a status segment
         if(ignoreStatus != null && ignoreStatus == false){
            mtch = tokens[i].match(statusExp);
            if (mtch != null)
               continue;
         }

         if(retErrMsg != null)
             return "Invalid Email Address : " + tokens[i];
         else
             return false;
       } else {
         if(mtch[1].length > size){
            if(retErrMsg != null)
               return "Length of email address " + mtch[1] + " greater than maximum allowed length";
            else
               return false;
         }
       }

    }

    return true;
}


/**
 * Shows the default confirm message
 * 
 * @param msg the message to be displayed
 */
function showConfirm(msg){
   if (msg== null) {
      msg = "All unsaved information will be lost. Are you sure?\nClick OK if you did not change anything.";
   }
   return confirm(msg);
}

/**
 * Alert message to show comming soon message
 */
function comingSoon(){
   setTimeout('alert("Coming soon..")', 250);
}

/**
 * The function is used to display the travel event
 * creation screen in a seperate string.
 * 
 * @param formString the string representation of the form object calling
 *                   this function
 * @param base       the servlet url
 */
function popupTravel(formString, base){
   form = eval(formString);
   hrs = 12;
   min = 0;
   if(form.duedateHrs){
      hrs = form.duedateHrs.options[form.duedateHrs.selectedIndex].value;
      min = form.duedateMin.options[form.duedateMin.selectedIndex].value;
   }

   dd = new Date();
   if(form.duedateYear){

      var ddYear = dd.getFullYear() + "";
      if(form.duedateYear.selectedIndex)
         ddYear = form.duedateYear.options[form.duedateYear.selectedIndex].value;
      else{

         var yearCheck = ddYear;
         if(trim(form.duedateYear.value) != "")
            yearCheck = trim(form.duedateYear.value);

         if(isInteger(yearCheck)){

            if(parseInt(yearCheck) >= 1800)
               ddYear = yearCheck;
         }

      }
      dd = new Date(ddYear,
                    form.duedateMonth.options[form.duedateMonth.selectedIndex].value,
                    form.duedateDay.options[form.duedateDay.selectedIndex].value, hrs, min);
   }

   timezone = "";
   if(form.timeZone)
      timezone = form.timeZone.options[form.timeZone.selectedIndex].value;

setTimeout("window.open(\"" + base + "?op=CalendarModule.TravelEventOperation&Cancel=Cancel&travelDate=" + dd.getTime() + "&travelTimezone=" + timezone + "\", \"travelPopup\"," +
                       "\"resizable=yes,scrollbars=yes,status=0,width=900,height=600\")", 250);
}



hasChanged = "false";

/**
 * Method to set the hasChanged flag
 */
function fireChange()
{
   hasChanged = "true";
   return;
}


/**
 * The method to check if any fields in a given form
 * are changed
 */
function isChanged()
{
   if (hasChanged == "true") {
      if (confirm("This page has been edited.\nAre you sure you want to lose the changes?")) {
         return true;
      }else {
         return false;
      }
   }
   return true;
}

/**
 * This method is used to check if the date is in the 
 * past.
 * 
 * @param pastDate the date should be in GMT
 */
function isDateInPast(pastDate)
{
   date = new Date();
   presentDate = new Date(Date.UTC(date.getUTCFullYear(),
                                   date.getUTCMonth(),
                                   date.getUTCDate(),
                                   date.getUTCHours(),
                                   date.getUTCMinutes()));


   if(presentDate.getTime() >= pastDate.getTime())
      return true;

   return false;
}

/**
 * This method is used to get the timezone offset form GMT. This method is very spoecific to the
 * timezone readables in the properties files
 *
 * @param dateOject teh readable format of the timezone
 * @return Offset the offset form the GMT
 */
  function getTimezoneOffset(dateObject){
     words = dateObject.split(" ");
     offset = 0;
     var wLen = words.length;


     if(wLen != 2){

        s1 = words[wLen -1].split(":");
        offset = s1[0];
        s3 = parseInt(s1[1], 10);
     }else {
        offset = 0;
        s3 = 0;
     }

     offset = offset + "." + s3/60;
     
     return parseInt(offset, 10);
  }

  /**
   * This method is used to check if the event being created is in the past
   *
   * @param form the form object like document.CreateGeneralEvent
   * @return return true or false, true if in past
   */
  function checkDateInPast(form){

     var year;
     if(form.duedateYear.selectedIndex){

        year = form.duedateYear.options[form.duedateYear.selectedIndex].value;

     }else{

        year = form.duedateYear.value;

        if(trim(year) == ""){

           d = new Date();

           year = d.getFullYear() + "";
        }
     }
     month = form.duedateMonth.options[form.duedateMonth.selectedIndex].value;
     day = form.duedateDay.options[form.duedateDay.selectedIndex].value;

     dHrs = 0;
     dMin = 0;


     noTime = false;
     //check if the time of the event exists
     if(form.duedateHrs){

        //check if there is a checkbox for checking the time of the event
        if(form.dueDateTime){

           if(form.dueDateTime.checked){
              dHrs = form.duedateHrs.options[form.duedateHrs.selectedIndex].value;
              dMin = form.duedateMin.options[form.duedateMin.selectedIndex].value;
           }else{

              if(form.time){
                  dHrs = form.duedateHrs.options[form.duedateHrs.selectedIndex].value;
                  dMin = form.duedateMin.options[form.duedateMin.selectedIndex].value;
              } else
                  noTime = true;
           }

        }else{

           dHrs = form.duedateHrs.options[form.duedateHrs.selectedIndex].value;
           dMin = form.duedateMin.options[form.duedateMin.selectedIndex].value;
        }

     }else{
        noTime = true;
     }

     //check if there is radio buttons for both date and all day events
     addDay = false;
     if(form.time){
        if(form.time[0]){
            if(form.time[1].checked){
               addDay = true;
            }
         }else{
            if(noTime){
               addDay = true;
            }
         }
     }else{
        if(noTime)
            addDay = true;
     }

     if(addDay){
        dHrs = 0;
        dMin = 0;
        day = parseInt(day, 10) + 1;
     }

     if((!form.timeZone) || (noTime)){

        dDate = new Date(year,
                         month,
                         day,
                         dHrs,
                         dMin);

        presentDate = new Date();

        return (presentDate.getTime() >= dDate.getTime())
     }

     dDate = new Date(Date.UTC(year,
                               month,
                               day,
                               dHrs,
                               dMin));


     dOffset = 0;
     //if the timezone exists then get the offset from the GMT
     if((form.timeZone) && (!noTime))
         dOffset = getTimezoneOffset(form.timeZone.options[form.timeZone.selectedIndex].text);

     departureDate = getDateInGMT(dDate, dOffset);

     return isDateInPast(dDate);
  }

  /**
   * This message is used to show the past messages
   */
  function showPastMsg(){

     if(confirm("Are you sure you want to create the event in the past?"))
        return true;
     else
        return false;
  }


var deleteWindow;
/**
 * This method is used to render the window when any event which is recursive giving the user
 * all the options for delete .
 * 
 * @param parentform        the form that is being called
 * @param url               the servlet url
 * @param id                the id of the event that is being deleted
 * @param entityid          the entityid to which this event belongs
 * @param type              the event type
 * @param eventtype         the subtype of the event being deleted
 * @param eventduedate      the date the event is due
 * @param action            the action to be performed when the request is submitted
 * @param calendarType      the type of calendar
 * @param containsRecursive specifies whether the event being deteled is a recursive
 *                          event or not
 * @param deleteaction      the delete action that is to be performed
 * @param iscreator         sepecifies whether the function is being called by
 *                          the creator of the event or not.
 * @param isrepeating       specifies whether the event is a repeating event or
 *                          not.
 * @param orgevent          specifies whether the event being deleted is an org
 *                          event or not
 */
function deleteRecursive(parentform,
                         url,
                         id,
                         entityid,
                         type,
                         eventtype,
                         eventduedate,
                         action,
                         calendarType,
                         containsRecursive,
                         deleteaction,
                         iscreator,
                         isrepeating,
                         orgevent){
   var rHeight = 60;
   var dTHeight = 0;
   var width = 400;

   if(isrepeating == '1'){
      rHeight = (rHeight * 3);
   }else{
      rHeight = (rHeight * 1) + 50;
   }

   var orgView = '0';
   if(entityid != calendarType)
      orgView = '1';

   if((orgView == '1') && (iscreator != '1'))
      dTHeight = (50 * 2);
   else if((orgView == '1') && (iscreator == '1')) {
      dTHeight = (50 * 3);
      width = 565;
   }
   else if((orgView != '1') && (iscreator == '1') && (eventtype == '1') && (orgevent == '1')){
      dTHeight = (50 * 2);
      width = 520;
   }
   else if((orgView != '1') && (iscreator == '1') && (eventtype == '100') && (orgevent == '1')){
      dTHeight = (50 * 3);
      width = 520;
   }


   var height = rHeight + dTHeight;

   var posX = (screen.width-width)/2;
   var posY = (screen.height-height)/2;


   string = "deleteWindow = window.open('" + url + "?op=CalendarModule.DeleteRecursivePopupOperation&parentForm=";
   string =  string + parentform + "&ID=" + id + "&EntityID=" + entityid + "&type=";
   string = string + type + "&eventType=" + eventtype + "&eventDueDate="  + escape(eventduedate) + "&ka=";
   string = string + action + "&ct=" + calendarType;
   string = string + "&containsRecursive=" + containsRecursive + "&deleteAction=";
   string = string + deleteaction + "&isCreator=" + iscreator + "&isRepeating=" + isrepeating + "&orgEvent=" + orgevent;
   string = string + "','deleteWindow', 'resizable=no,scrollbars=no,status=0,width=" + width +",height=" + height + ",left="+posX + ",top=" + posY + "');deleteWindow.focus();";

   setTimeout(string, 250);


}


/**
 * Function that sets the recursive values on the parent
 * form which called the delete recursive.
 * 
 * @param parentformstring  the string representation of the parent for,
 * @param deleteaction      the type of the delete to be performed.
 * @param containsrecursive the type of recursice delete to be performed.
 * @param id                the id of the event to be deleted.
 * @param entityid          the entity id of the event to be deleted
 * @param type              the type of the event being deleted.
 * @param eventType         the event sub type to be deleted.
 * @param eventduedate      the due date of the event being deleted.
 * @param action            the action to be performed
 * @param calendartype      the type of calendar.
 */
function setRecursiveValues(parentformstring,
                            deleteaction,
                            containsrecursive,
                            id,
                            entityid,
                            type,
                            eventType,
                            eventduedate,
                            action,
                            calendartype){

   var parentform = eval(parentformstring);

   parentform.containsRecursive.value  = containsrecursive;
   parentform.deleteAction.value       = deleteaction;
   parentform.ID.value                 = id;
   parentform.EntityID.value           = entityid;
   parentform.type.value               = type;
   parentform.eventType.value          = eventType;
   parentform.eventDueDate.value       = eventduedate;
   parentform.ka.value                 = action;
   parentform.ct.value                 = calendartype;
   parentform.submit();
}



/**
 * Thi method is used to close the delete window
 */
function deleteCleanup(){
   if((deleteWindow) && (!deleteWindow.closed))
      deleteWindow.close();
}


/**
 * Get the cookie from the browser.
 * 
 * @param name the name of the cookie we are trying to get.
 */
function getCookie(name) {
    var start = document.cookie.indexOf(name+"=");
    var len = start+name.length+1;
    if ((!start) && (name != document.cookie.substring(0,name.length))) return null;
    if (start == -1) return null;
    var end = document.cookie.indexOf(";",len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len,end));
}

/**
 * Set a cookie on the browser
 * 
 * @param name    the name of the cookie being set
 * @param value   the value to which it is to be set
 * @param expires the date after which the cookies expire.
 * @param path    the path of the cookie
 * @param domain  the domain of the cookie
 * @param secure  sepecifies whether the cookie being set is secure or not.
 */
function setCookie(name,value,expires,path,domain,secure) {
    document.cookie = name + "=" +escape(value) +
        ( (expires) ? ";expires=" + expires.toGMTString() : "") +
        ( (path) ? ";path=" + path : "") +
        ( (domain) ? ";domain=" + domain : "") +
        ( (secure) ? ";secure" : "");
}

/**
 * Deletes the cookie from the browser.
 * 
 * @param name   the name of the cookie to be deleted.
 * @param path   the path of the cookie that is being deleted.
 * @param domain the domain of the cookie being deleted
 */
function deleteCookie(name,path,domain) {
    if (getCookie(name)) document.cookie = name + "=" +
        ( (path) ? ";path=" + path : "") +
        ( (domain) ? ";domain=" + domain : "") +
        ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}


/**
 * This method is used to open the send mesage window 
 * where the user can send an email message
 * 
 * @param url   the servlet url
 * @param eid   String the IEntityIdentifier key to whom the mail
 *              message has to be sent
 * @param winId int used to randomize the window name.
 */
function openSendMsgWin(url, eid, winId){
    var winName = "sendMsgWin" + winId;
    setTimeout(winName+ " = window.open('" + url +"?op=MailModule.MailOperation&opt=popUp&entityIds=" + eid +"','" + winName +"', 'resizable=yes,scrollbars=no,status=0,width=650,height=425');eval('"+ winName + ".focus();');", 250);
}

/**
 * This method is used to open the note activity window
 * 
 * @param op     the operation to which the request is to be redirected.
 * @param action the action to perform
 * @param url    the servlet url
 * @param eid    String the IEntityIdentifier key whose notes/activity has to be viewed
 * @param winId  int used to randomize the window name.
 */
function openNotesActivityWin(op, action,url, eid, winId){
    var winName = "naWin" + winId;
    setTimeout(winName+ " = window.open('" + url +"?op=" + op + "&ka=" + action + "&EntityID=" + eid +"','" + winName +"', 'resizable=yes,scrollbars=yes,status=0,width=675,height=600');eval('"+ winName + ".focus();');", 250);
}

/**
 * This method is used to refresh notes activity window
 */
function refreshNotesActivityWin(){
   var form = document.contact;
   form.op.value = "ContactsModule.NotesActivityFrameOperation";
   form.target='_parent';
   form.submit();
}

/**
 * This method is used by the contacts module to check if any thing is entered in the
 * textfield for the search.
 *
 * @Note: This method is temporarly added here, but once more and more methods come in for
 *        contacts then this will be moved to contact.js.
 */
function check(){
if(trim(document.contact.lastName.value) == ""){
    alert("Please enter a string to search on.");
    return false;
}else
    return true;
}



var EventShortcutWindow;

/**
 * This method is used to open the shorcut cut window 
 * to select the event type
 * 
 * @param url      The servlet url
 * @param longDate the date in milliseconds Optional
 * @param op       the return operation
 * @param ct       The calendar type to go to. Optional
 * @param rm       The optional return module. By default it is CM
 * @param assignee list of assignee's entityIdentifier keys seperated
 *                 by comma, this optional
 * @param pname    the parent form name
 */
function openEventShortcut(url,longDate,op, ct, rm, assignee, pname){
   
   var posX = (screen.width-250)/2;
   var posY = (screen.height-150)/2;
   string = "EventShortcutWindow = window.open('" + url + "?op=CalendarModule.EventShortcutOperation&ro=" + op; 
   if(longDate != null)
      string += "&calendarLongValue=" + longDate;

   if(ct != null)
      string +=  "&ct=" + ct;

   if(rm == null)
      rm ='CM';
   string += "&rm=" + rm;

   if(assignee != null)
      string += "&assignee=" + assignee;

   if(pname != null)
      string += "&pname=" + pname;

   string += "', 'EventShortcutWindow', 'resizable=no,scrollbars=no,status=0,width=250,height= 150,left="+posX + ",top=" + posY +")');EventShortcutWindow.focus();";
   
   setTimeout(string, 250);

}

/**
 * This method is used to clean up the open window.
 */
function cleanup(){

   if((EventShortcutWindow) && (!EventShortcutWindow.closed))
      EventShortcutWindow.close();
}
/**
 * Uses email module to compose a message
 * 
 * @param opName   the name of the operation this request is directed
 *                 to when the window is opened
 * @param formName the name of the form
 * @param address  the email address
 * @param entityId the entity id of of the recipient, if there is one
 */
function sendEmail(opName, formName, address, entityId){
    var form = eval(formName);
    form.op.value=opName;
    form.ka.value="semail";
    form.kseta.value=address;
    if (form.kseteid) {
		if (entityId) {
        	form.kseteid.value=entityId;
		}
    }

    form.submit();
}

var ViewContactWindow;
/**
 * To view the contact given the enttity id key
 *
 * @param url, the  location of the servlet
 * @param eidKey the entityEIDKey
 */
function viewContactDetails(url, eidKey){
   string = "ViewContactWindow = window.open('" + url + "?op=CT.19&ka=aecv&EntityID="; 
   string+= eidKey;
   string += "', 'ViewContactWindow', 'resizable=yes,scrollbars=yes,status=0,width=600,height=700)');ViewContactWindow.focus();";
   
   setTimeout(string, 250);
}


/**
 * detrmine if the key that is pressed is the enter key or not.
 * @param evt the keypress event
 */
function isEnterKey(evt) {
    if (navigator.appName=="Netscape") {
        theKey = evt.which
    }

    if (navigator.appName.indexOf("Microsoft") != -1) {
        theKey=window.event.keyCode
    }

    return theKey == 13
}

