// Javascript functions used by rendered pages in the EmailModule

function isValidFolderName(folderName)
{
    // for right now, just return true if the folderName is not some
    // blank string.
    if (!trim(folderName) || (folderName.indexOf('.') >= 0))
    {
        return false;
    }

    return true;
}

// used by the new/edit folder pages
function validateFolderName()
{
    if (!isValidFolderName(document.folderForm.folderName.value))
    {
        alert("Please enter a valid folder name.");

        return false;
    } else
    {
        return true;
    }
}

/**
 * used to check if a destination folder to move to, has been selected
 * @param formObject Form which contains the move widget to use for validation
 * @return true if a move folder is selected; false otherwise
 */
function validateMoveFolderSelection(formObject)
{
    if (!formObject.destFolderId || formObject.destFolderId.selectedIndex == 0)
    {
        alert('Please select a destination folder.');

        return false;
    } else
    {
        return true;
    }
}

// used to validate email addresses
// this is extracted from main.js, since currently, the function in main.js
// works specifically with text fields, and with invitee status flags.

var maxEmailAddressLength = 75;
var emailPattern = /([^\s\\\(\)\[\]<>;,:"@]+@[^\s\\\(\)\[\]<>;,:"]+)[:;,\s]*/;
var groupPattern = /.+-.+/;

function isValidEmailAddress(address)
{
    var match = address.match(emailPattern);

    if (match != null)
    {
        return (match.length <= maxEmailAddressLength);
    } else
    {
        match = address.match(groupPattern);

        if (match != null)
        {
            return (match.length <= maxEmailAddressLength);
        }

        return false;
    }
}

var emailFetchInformWindow;
/**
 * This method is used to popup the email fetch Inform window
 *
 * @param url the servlet url
 */
function openEmailFetchInform(url){

   var posX = (screen.width-400)/2;
   var posY = (screen.height-100)/2;


   string = "emailFetchInformWindow = window.open('" + url +"?op=EmailModule.EmailFetchInformOp";
   string = string + "','emailFetchInformWindow', 'resizable=no,scrollbars=no,status=no,width=400,height=100,left="+ posX + ",top=" + posY + "');emailFetchInformWindow.focus();";


   setTimeout(string, 2500);

   return true;
}

/**
 * This method is used to close the email fetchInform window
 */
function emailFetchInformCleanup(){
   if((emailFetchInformWindow) && (!emailFetchInformWindow.closed))
      emailFetchInformWindow.close();
}

/**
 * Alert user that there are no items selected.
 */
function alertNoItemsSelected() {
    alert('There are no items currently selected.');
    return false;
}
