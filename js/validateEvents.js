/**
 * Method to validate the notification portion in event
 * create and update screens
 * 
 * @param formName the name of the form
 * @param msg      the message object that is to be displayed
 */
function validateNotification(formName, msg){
    //notification part
    if (formName.preNotification && formName.preNotification.checked) {
        if (!isInteger(formName.preNotificationTime.value)) {
            msg.add("Invalid notification time " + formName.preNotificationTime.value);
        } else {
            if (!inRange(parseInt(formName.preNotificationTime.value, 10), 0, 999))
                msg.add("The notification time cannot be greater than 999");
        }
    }
    if (formName.notification  && formName.notification.checked) {
        if (!isInteger(formName.notificationTime.value)) {
            msg.add("Invalid notification time " + formName.notificationTime.value);
        } else {
            if (!inRange(parseInt(formName.notificationTime.value, 10), 0, 999))
                msg.add("The notification time cannot be greater than 999");
        }
    }

}
                    
/**
 * Validate the end date based on type
 * 
 * @param form the form object in which this validation is being
 *             done
 * @param msg  the message object that is to be displayed
 * @param type the type of the creation/update screens of the event
 */
function validateSpecific(form, msg, type){
    if (type == "0") {//createattendeeevent.html, updateAttendeeEvent.html
        if (form.enddateYear) {
            if (form.endDate.checked && form.time[1].checked) {
                if (!isValidDate(form.enddateYear.options[form.enddateYear.selectedIndex],
                                 form.enddateMonth.options[form.enddateMonth.selectedIndex],
                                 form.enddateDay.options[form.enddateDay.selectedIndex], 
                                 true)) {
                    msg.add("The end date and month are invalid");
                    this.edError = true;
                } else {
                    this.edError = false;
                }
            }
            if (form.endDate.checked && form.time[1].checked  && !this.ddError && !this.edError) {
                dd = new Date(getDueDateYear(fName, this.ddIsSelection),
                              form.duedateMonth.options[form.duedateMonth.selectedIndex].value,
                              form.duedateDay.options[form.duedateDay.selectedIndex].value);
                ed = new Date(form.enddateYear.options[form.enddateYear.selectedIndex].value,
                              form.enddateMonth.options[form.enddateMonth.selectedIndex].value,
                              form.enddateDay.options[form.enddateDay.selectedIndex].value);
                if (ed < dd) {
                    msg.add("The end date has to be after the due date");
                }
            }
        }
    } else if (type == "1") {//CreateTaskRequest.html

        if (form.startDate.checked) {
            if (!isValidDate(form.startDateYear.options[form.startDateYear.selectedIndex],
                             form.startDateMonth.options[form.startDateMonth.selectedIndex],
                             form.startDateDay.options[form.startDateDay.selectedIndex],
                             true)) {

                msg.add("The start date and month are invalid");
                this.stError = true;
            } else {
                this.stError = false;
            }
        }

        if ((form.dueDate.checked) && (form.startDate.checked) && !this.ddError && !this.stError) {

            dd = new Date(getDueDateYear(fName, this.ddIsSelection),
                          form.duedateMonth.options[form.duedateMonth.selectedIndex].value,
                          form.duedateDay.options[form.duedateDay.selectedIndex].value);
            st = new Date(form.startDateYear.options[form.startDateYear.selectedIndex].value,
                          form.startDateMonth.options[form.startDateMonth.selectedIndex].value,
                          form.startDateDay.options[form.startDateDay.selectedIndex].value);
            if (st > dd)
                msg.add("The start date has to be before the due date");
        }

        
        if(form.timeOfDay){
           if (!form.timeOfDay[0].checked && !form.dueDate.checked)
            msg.add("Task requests with no due date cannot be repeating");
        }
        

    } else if (type== "2") {     //CreateTodoEvent.html, updateTodoevent.html
        if (!form.dueDate.checked) {

            if ((form.notification.checked) || (form.preNotification.checked)) {
                msg.add("Notification cannot be set for Todo's with no Due date");
            }

            if (!form.timeOfDay[0].checked) {
                msg.add("Todo's with no due date cannot be repeating");
            }
        }
        if (form.startDate.checked) {
            if (!isValidDate(form.startDateYear.options[form.startDateYear.selectedIndex],
                             form.startDateMonth.options[form.startDateMonth.selectedIndex],
                             form.startDateDay.options[form.startDateDay.selectedIndex],
                             true)) {

                msg.add("The start date and month are invalid");
                this.stError = true;
            } else {
                this.stError = false;
            }
        }
        if ((form.dueDate.checked) && (form.startDate.checked) && !this.ddError && !this.stError) {

            dd = new Date(getDueDateYear(fName, this.ddIsSelection),
                          form.duedateMonth.options[form.duedateMonth.selectedIndex].value,
                          form.duedateDay.options[form.duedateDay.selectedIndex].value);
            st = new Date(form.startDateYear.options[form.startDateYear.selectedIndex].value,
                          form.startDateMonth.options[form.startDateMonth.selectedIndex].value,
                          form.startDateDay.options[form.startDateDay.selectedIndex].value);
            if (st > dd)
                msg.add("The start date has to be before the due date");
        }

    } else if (type == "3") { //updateVacationEvent.html, VacationEvent.html
        if (!isValidDate(form.enddateYear.options[form.enddateYear.selectedIndex],
                         form.enddateMonth.options[form.enddateMonth.selectedIndex],
                         form.enddateDay.options[form.enddateDay.selectedIndex],
                         true)) {

            msg.add("The end date and month are invalid");
            this.edError = true;
        } else {
            this.edError = false;
        }

        if (!this.ddError && !this.edError) {

            dd = new Date(getDueDateYear(fName, this.ddIsSelection),
                          form.duedateMonth.options[form.duedateMonth.selectedIndex].value,
                          form.duedateDay.options[form.duedateDay.selectedIndex].value);
            ed = new Date(form.enddateYear.options[form.enddateYear.selectedIndex].value,
                          form.enddateMonth.options[form.enddateMonth.selectedIndex].value,
                          form.enddateDay.options[form.enddateDay.selectedIndex].value);
            if (ed < dd)
                msg.add("The end date has to be after the due date");
        }

    }
}

/**
 * This function is used to get the due date year from the template.
 * 
 * @param fName the formName
 * @param flag  the flag that tells whether the due date year is
 *              selection or not
 * @return the due date year
 */
function getDueDateYear(fName, flag){

   if(flag){

      return fName.duedateYear.options[fName.duedateYear.selectedIndex].value;

   }else{

      selectionYear = fName.duedateYear.value;

      if(trim(selectionYear) != "")
         return selectionYear;
      else{

         dateObj = new Date();

         return dateObj.getFullYear() + "";
      }
   }
}


/**
 * This function does the basic validation which can be present on all pages
 */
function validateBasic(){
    fName = this.formName;
    fMsg = this.msg;
    //title
    if ((this.checkTitle) && (fName.title && trim(fName.title.value)==""))
        fMsg.add("No Title was entered");
    
    //check event association
    if((this.checkTitle) && (fName.eaeid) && (trim(fName.eaeid.options[fName.eaeid.selectedIndex].value) == "")){
       fMsg.add("Choose Org Association: \nFor meetings, conference calls and interviews, minutes may be taken. This information should be private to your organization. So, choosing a related organization will only allow active members in that organization to see the minutes.");
    }
    //due date
    if (fName.duedateYear) {

        //if there is a check box
        ddCheck = true;
        if (fName.dueDate) {
            if (fName.dueDate.checked)
                ddCheck = true;
            else
                ddCheck = false;
        }

        //checking if the duedate year field is an selection box or textfield
        if(!fName.duedateYear.selectedIndex)
           this.ddIsSelection = false;

        //getting the year from the template
        year = getDueDateYear(fName, this.ddIsSelection);

        //checking if the year is an valid number
        if(!isInteger(year)){
           fMsg.add("The due date year is invalid");
           return;
        }

        //checking if the year is greater than 1800
        if(!this.ddIsSelection){

           if(parseInt(year) < 1800){
              fMsg.add("The due date year cannot be less than 1800");
              return;
           }
        }

        var yearObject;

        if(this.ddIsSelection)
           yearObject = fName.duedateYear.options[fName.duedateYear.selectedIndex];
        else
           yearObject = fName.duedateYear;

        if (ddCheck && !isValidDate(yearObject,
                                    fName.duedateMonth.options[fName.duedateMonth.selectedIndex],
                                    fName.duedateDay.options[fName.duedateDay.selectedIndex],
                                    true)) {

            fMsg.add("The due date and month are invalid");
            this.ddError = true;
        } else {
            this.ddError = false;
        }
    }

    if((this.checkTitle) && (!isAllDayEvent(fName) &&  !isUntimedEvent(fName) && fName.timeZone)){
       var tz = fName.timeZone.options[fName.timeZone.selectedIndex].value;
       if(trim(tz) == "")
          fMsg.add("No Time Zone is selected");
    }

    validateSpecific(fName, fMsg, this.type);

    //finish date
    if (fName.finishdateYear) {
        if (fName.finishDate.checked) {
            if (!isValidDate(fName.finishdateYear.options[fName.finishdateYear.selectedIndex],
                             fName.finishdateMonth.options[fName.finishdateMonth.selectedIndex],
                             fName.finishdateDay.options[fName.finishdateDay.selectedIndex],
                             true)) {

                fMsg.add("The finish date and month are invalid");
                this.fdError = true;
            } else {
                this.fdError = false;
            }
        }
        if (fName.finishDate.checked && !this.ddError && !this.fdError) {
            
            dd = new Date(getDueDateYear(fName, this.ddIsSelection),
                          fName.duedateMonth.options[fName.duedateMonth.selectedIndex].value,
                          fName.duedateDay.options[fName.duedateDay.selectedIndex].value);
            fd = new Date(fName.finishdateYear.options[fName.finishdateYear.selectedIndex].value,
                          fName.finishdateMonth.options[fName.finishdateMonth.selectedIndex].value,
                          fName.finishdateDay.options[fName.finishdateDay.selectedIndex].value);

            if (fd < dd)
                fMsg.add("The finish date has to be after the due date");
        }
    }

    if (fName.duration && fName.duration.value != "") {
        if (!isFloat(fName.duration.value))
            fMsg.add("Invalid duration " + fName.duration.value);
    }
    validateNotification(fName, fMsg);

    errorFlag = checkAllDayRepeatingEvent(fName);
    if(!errorFlag)
       fMsg.add("Cannot create events with overlapping repeat invterval");


    //notes or description
    if (fName.description && fName.description.value.length > 4000)
        fMsg.add("Maximum length of notes can be 4000 characters long");

    if (fName.purpose && fName.purpose.value.length > 4000)
        fMsg.add("Maximum length of Purpose cannot exceed 4000 characters");

    if (fName.decision && fName.decision.value.length > 4000)
        fMsg.add("Maximum length of Decisions To Be Made cannot exceed 4000 characters");

    if (fName.agenda && fName.agenda.value.length > 4000)
        fMsg.add("Maximum length of Agenda cannot exceed 4000 characters");

    if (fName.toReview && fName.toReview.value.length > 4000)
        fMsg.add("Maximum length of Materials To Review cannot exceed 4000 characters");

    if (fName.location &&  fName.location.value.length > 4000)
        fMsg.add("Maximum length of Location cannot exceed 4000 characters");
}

/**
 * Method to check if the event being created is an all day event or not
 * 
 * @param fName the name of the form
 */
function isAllDayEvent(fName){

   if(fName.time && fName.time[1] && fName.time[1].checked )
      return true;

   return false;
}

/**
 * Method to check if the event being created is an 
 * untimed event or not
 * 
 * @param fName the name of the form
 */
function isUntimedEvent(fName){

   if(fName.dueDateTime && (fName.dueDateTime.type == "checkbox")  && !fName.dueDateTime.checked)
      return true;

   return false;
}

/**
 * This method is used to check if the an all day 
 * event which is repeating is valid or not
 * 
 * @param fName the name of the form
 */
function checkAllDayRepeatingEvent(fName){

   var dd = null;
   //get the due date
   if (fName.duedateYear){

      //if there is a check box
      var ddCheck = true;
      if (fName.dueDate) {
          if (fName.dueDate.checked)
              ddCheck = true;
          else
              ddCheck = false;
      }

      if(ddCheck){
         var year = getDueDateYear(fName, this.ddIsSelection);
         dd = new Date(year,
                       fName.duedateMonth.options[fName.duedateMonth.selectedIndex].value,
                       fName.duedateDay.options[fName.duedateDay.selectedIndex].value);
      }

   }

   if(dd == null)
      return true;

   //check if the event is an all day event
   if(fName.time && fName.time[1] && fName.time[1].checked ){
      
      if(!fName.enddateYear)
         return true;

      var edCheck = true;
      if(fName.endDate){
         if(fName.endDate.checked)
            edCheck = true;
         else
            edCheck = false;
      }

      if(!edCheck)
         return true;

      var ed = new Date(fName.enddateYear.options[fName.enddateYear.selectedIndex].value,
                    fName.enddateMonth.options[fName.enddateMonth.selectedIndex].value,
                    fName.enddateDay.options[fName.enddateDay.selectedIndex].value);


      if(fName.timeOfDay && fName.timeOfDay[1] && fName.timeOfDay[1].checked){

         var repeatInterval = eval(fName.every.options[fName.every.selectedIndex].value);
         var repeatUnit = eval(fName.repeatType.options[fName.repeatType.selectedIndex].value);

         var ddDay = eval(dd.getDate());
         var ddMonth = eval(dd.getMonth());
         var ddYear = eval(dd.getFullYear());

         // day
         if(repeatUnit == 19){
            ddDay = ddDay + repeatInterval;
         }
         //week
         else if(repeatUnit == 20){
            ddDay = ddDay + 7*repeatInterval;
         }
         //month
         else if(repeatUnit == 21){
            ddMonth = ddMonth + repeatInterval;
         }
         //year
         else if(repeatUnit == 22)
            ddYear = ddYear + repeatInterval;

         var ddWDay = dd.getDay();

         var weekMultiplier = 7 * (repeatInterval - 1);

         var rollAmt = 1;
         //Mon,Wed & Fri
         if(repeatUnit == 23){

            if(ddWDay == 5)
               rollAmt = 3 + weekMultiplier
            else if((ddWDay == 1) || (ddWDay == 3))
               rollAmt = 2;

            ddDay = ddDay + rollAmt;
         }
         //Tue, Thu
         else if(repeatUnit == 24){

            if(ddWDay == 2)
               rollAmt = 2;
            else if(ddWDay == 4)
               rollAmt = 5 + weekMultiplier;
            else if(ddWDay == 5)
               rollAmt = 4 + weekMultiplier;
            else if(ddWDay == 6)
               rollAmt = 3 + weekMultiplier;
            else if(ddwDay == 0)
               rollAmt = 2;

            ddDay = ddDay + rollAmt;
         }
         //Mon thru Fri
         else if(repeatUnit == 25){

            if(ddWDay == 5)
               rollAmt = 3 + weekMultiplier;
            else if(ddWDay == 6)
               rollAmt = 2 + weekMultiplier;

            ddDay = ddDay + rollAmt;
         }
         //Sat & Sun
         else if(repeatUnit == 26){

            if(ddWDay == 0)
               rollAmt = 6;
            else if(ddWDay == 6)
               rollAmt = 1 + weekMuliplier;
            else if(ddWDay == 1)
               rollAmt = 5;
            else if(ddWDay == 2)
               rollAmt = 4;
            else if(ddWDay == 3)
               rollAmt = 3;
            else if(ddWDay == 4)
               rollAmt = 2;

            ddDay = ddDay + rollAmt;
         }

         //var nd = createDate(ddYear, ddMonth, ddDay);
         var nd = new Date(ddYear, ddMonth, ddDay);

         var ddTime = dd.getTime();
         var edTime = ed.getTime();
         var ndTime = nd.getTime();

         if((ddTime <= ndTime) && (ndTime <= edTime))
            return false;
      }

   }//end of the check

   return true;
}//end of method



/**
 * This method is used to validate the event pages
 */
function validateEvent(){

    this.formName = "";
    this.msg = "";
    this.type= "";
    //this.sr = false;
    this.validateBasic = validateBasic;
    this.checkTitle = true;

    this.ddIsSelection = true;
    this.ddError = false;
    this.edError = false;
    this.fdError = false;
    this.stError = false;
}



/**
 * This is the initial method that is called by all
 * the event pages to do validation.
 * This method also initializes the various attributes
 * to do the neccessary validation.
 * 
 * @param type the type of event screen
 */
function isValid(type){
    if (type != null)
        this.type= type;
    this.validateBasic();
    return this.msg.show();
}

/**
 * function which actually validates default events
 * 
 * @param formName   the name of the form
 * @param checkTitle specifies whether to check the title of the event
 *                   when the validation of event screens are being done
 */
function validateE(formName, checkTitle){
    this.formName= formName;
    this.msg = new Message();
    this.isValid = isValid;

    this.ddError = false;
    this.edError = false;
    this.fdError = false;
    this.stError = false;

    if(checkTitle != null)
       this.checkTitle = checkTitle;


}
//creation of the validate event object
validateE.prototype =  new validateEvent();


//------------------------------------------------------------------------------------------------------
/**
 * Changes the status based on % completed
 * 
 * @param form the form object which is calling this function
 */
function statusChange(form){

    if(parseInt(form.complete.options[form.complete.selectedIndex].value, 10) >= 0){
         if(parseInt(form.complete.options[form.complete.selectedIndex].value, 10) == 100)
            setSelected(form.status, 100);
         else
            setSelected(form.status, 1000);
    }
}

/**
 * Changes the % completed bases on status
 * 
 * @param form the form objects which is calling this function
 */
function completedChange(form){
   
   if(parseInt(form.status.options[form.status.selectedIndex].value, 10) >= 0){
         if(parseInt(form.status.options[form.status.selectedIndex].value, 10) == 100)
            setSelected(form.complete, 100);
         else if(parseInt(form.status.options[form.status.selectedIndex].value, 10) == 10000)
            setSelected(form.complete, 0);
         else
            setSelected(form.complete, 50);
   }

}

/**
 * Changes the recursive flag used for deletion of the event
 * 
 * @param form the form object which is calling this function
 */
function setRecursive(form) {
    if(confirm("This is a recurring event, do you want to delete all the occurences of this event?" +
               "\n" + "clicking Ok will delete all the occurences of this event" +
               "\n" + "clicking Cancel will delete only this event"))
        form.containsRecursive.value= "0";
    else
        form.containsRecursive.value= "1";
}

