/**
 * Save the chooser values in the cookies which is to 
 * be used by the Hotlist.
 * 
 * @param opId   the entityidentifier key
 * @param opText the name of the entityidentifier
 * @param key    the cookie key
 */
function svChHl(opId, opText, key){
   sep ='|';
   count = 5;
   path = '/';   //Need to fix this constants --hemanth 1/19

   var today = new Date();
   var newCok = opId + sep + opText;
   var expires = new Date(today.getTime() + 86400000);

   for(var i=0;i<count;i++){
      cok = getCookie(key + i);
      id = null;
      if(cok)
         id = cok.split(sep)[0];
      if(!cok || opId == id){
         mvChValue(i, expires, key, path);
         setCookie(key+0, newCok, expires, path);
         return;
      }
   }
   mvChValue(i, expires, key, path);
   setCookie(key+0, newCok, expires, path);
   return;
}

/**
 * delete the hotlist ids from the cookies
 * 
 * @param opId the entityIdentifier key
 * @param key  the key of the cookie
 */
function delChHl(opId, key){
   sep = '|';
   count = 5;
   path = '/';
   var today = new Date();
   var expires = new Date(today.getTime() + 86400000);

   for(var i=0;i<count;i++){
      cok = getCookie(key + i);
      id = null;
      if(cok){
         id = cok.split(sep)[0];
         if(opId == id){
            for(var j=i;j<count-1;j++){
               nextCok = getCookie(key+(j+1));
               setCookie(key+j, nextCok, expires, path);
            }
            deleteCookie(key+(count-1), path);
         }
      }
   }
}

/**
 * This function is used to move the chooser values
 * to the cookies
 * 
 * @param pos     the postion of the entityidentifier
 * @param expires the expiration of the cookie
 * @param key     the key for the cookie
 * @param path    the path of the cookie
 */
function mvChValue(pos, expires, key, path){
   for(var j=pos-1; j>=0; j--){
      cok = getCookie(key + j);
      setCookie(key + (j+1) , cok, expires, path);
   }
}

/**
 * Add saved chooser value
 * 
 * @param field the field to add to
 * @param id    the id to add
 * @param text  the text value to add
 */
function addSvChVal(field, id, text){
   var val = field.value;
   val += id + "|" + text;
   field.value = val;
}

/**
 * Delete saved chooser value
 * 
 * @param field The field to delete from
 * @param id    The id to delete
 */
function delSvChVal(field, id){
   var val = field.value.split("|");
   var newVal = "";
   for(var i=0; i<val.length; i+=2){
      if(val[i] != id)
         newVal += val[i] + "|" + val[i+1];
   }   
   field.value= newVal;
}

/**
 * close the chooser window
 * @param target The window
 */
function clChWin(target){
   if(target && !target.closed)
      target.close();
}


/**
 * Clip the string to its max length
 * 
 * @param str     the string to be resized
 * @param maxsize the maximun size of the string allowed
 */
function clipStr(str, maxsize){
   if(maxsize == null)
      return str;
   else if(str.length > maxsize)
      return (str.substr(0, maxsize) + "...");
   return str;
}

/**
 * Popluate the hot list  for multi chooser
 * 
 * @param selBox        the list that is to be populated
 * @param count         the number of elments to be displayed in the list
 * @param key           the key with which the cookie is identified
 * @param sep           the sepearator of the vlaues inside the filet, cookie and restricted ids
 * @param maxsize       the max number of elements that can be displayed in the list
 * @param filter        the ids which are not to be displayed in the list
 * @param restrictedStr the list of allowed displayed ids in the list
 */
function phlM(selBox, count, key, sep, maxsize, filter, restrictedStr){
   var filter = filter.split(sep);
   var restrictedIds = null;
   if(restrictedStr)
      restrictedIds = restrictedStr.split(sep);

   for(var i=0;i<count;i++){
      cok = getCookie(key + i);
      if(!cok) break;
      id = cok.substr(0, cok.indexOf(sep));
      txt = cok.substr(cok.indexOf(sep)+1);
      var showflag = false;
      for(var fi=0; fi<filter.length;fi++)
         if(id.indexOf(filter[fi]) != -1) showflag = true;    
      
      //if the show flag is true, then check if the id is present in the restrictedIds
      if(showflag && (restrictedIds != null)){
         showflag = false;
         for(var ri=0; ri<restrictedIds.length;ri++){
            if(id.indexOf(restrictedIds[ri]) != -1){
               showflag = true;
               break;
            }
         }
      }
      if(!showflag) continue;
      selBox.options[selBox.length] = new Option(clipStr(txt, maxsize), id, false, false);
   }
}  

/**
 * popluate the hot list for single chooser
 * 
 * @param selBox        the list that is to be populated
 * @param count         the number of elments to be displayed in the list
 * @param key           the key with which the cookie is identified
 * @param sep           the sepearator of the vlaues inside the filet, cookie and restricted ids
 * @param maxsize       the max number of elements that can be displayed in the list
 * @param filter        the ids which are not to be displayed in the list
 * @param restrictedStr the list of allowed displayed ids in the list
 */
function phlS(selBox, count, key, sep, maxsize, filter, restrictedStr){
   var selIdx = selBox.selectedIndex;
   var filter = filter.split(sep);
   var restrictedIds = null;
   if(restrictedStr)
      restrictedIds = restrictedStr.split(sep);

   for(var i=0;i<count ;i++){
      var cok = getCookie(key + i);
      if(!cok) break;
      var id = cok.substr(0, cok.indexOf(sep));
      var txt = cok.substr(cok.indexOf(sep)+1);
      var addflag = true;
      var showflag = false;
      for(var fi=0; fi<filter.length;fi++)
         if(id.indexOf(filter[fi]) != -1) showflag = true;   

      //if the show flag is true, then check if the id is present in the restrictedIds
      if(showflag && (restrictedIds != null)){
            showflag = false;
            for(var ri=0; ri<restrictedIds.length;ri++){
               if(id.indexOf(restrictedIds[ri]) != -1){
                  showflag = true;
                  break;
               }
            }
         }
      if(!showflag) continue;
      for (var j=0; j < selBox.length; j++) 
         if(selBox.options[j].value == id) {addflag = false; break;}
      if(addflag)
         selBox.options[selBox.length] = new Option(clipStr(txt,maxsize), id, false, false);
   }
   selBox.selectedIndex = selIdx;
}

/**
 * Delete option method for multi chooser. Also removes 
 * the value from the array
 * 
 * @param selBox the selecbox object
 * @param array  the array contaning the values to be displayed
 * @param i      the index of the value
 */
function rmOptM(selBox, array, i) {
   selBox.options[i] = null;
   for(j=i; j < array.length; j++)
      array[j] = array[j+1];
   if (array.length >0)
      array.length--;
}

/**
 * Delete all the user cookies
 * 
 * @param cookiePrefix the prefix of the cookies to be deleted
 */
function deleteUserCookies(cookiePrefix){
   var str     = document.cookie ;
   var cookies = str.split(';');
   for (var i = cookies.length; i--;){
     var parts = cookies[i].split('=');
     if (parts[0].substring(0,4) == " "+cookiePrefix){
        deleteCookie(parts[0],'/');
     }
   }
   return '';

}
