// function to change the login connection mode between secure
// and insecure.
function changeConnectMode() {
    var url = top.location.host;
    url += top.location.pathname; 
    url += top.location.search;

    if (document.LOGIN.option.selectedIndex == 0) {
        top.location.href="http://" + url;
    } else {
        top.location.href="https://" + url;
    }
}

// function sets the focus of the login form to either the login or 
// the password field
function setFocus(){
    if(document.LOGIN.uid.value == "")
        document.LOGIN.uid.focus();
    else
        document.LOGIN.pw.focus();

    if (document.LOGIN.option) {
        if (location.protocol == "http:") {
            document.LOGIN.option.options[0].selected = true;
        } else {
            document.LOGIN.option.options[1].selected = true;
        }
    }
}

// open a window with the given name, width, height, 
// resize capability (boolean), scroll bars (boolean)
function openwindow(name, w, h, r, sb) {
    var posX = (screen.width - w)/2;
    var posY = (screen.height - h)/2;

    if (!r) {
        r = "no";
    } else {
        r = "yes";
    }

    if (!sb) {
        sb = "no";
    } else {
        sb = "yes";
    }

    window.open(name,'','resizable='+r+',scrollbars='+sb+',status=0,left='+posX +',top='+posY +',width='+w +',height='+h);
}


