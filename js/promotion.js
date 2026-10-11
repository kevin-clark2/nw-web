// Uses getCookie(), setCookie(), and deleteCookie() in main.js
//
// the cookie used is named VP, for viewed promotions

var promotionList = new Array();
//promotionList[0] = ['/sweepstakes.html', 550, 400];

// function will pop-up a promotional announcement, if the
// viewer has not seen that promotion yet.  Views are kept
// track of through cookies.
function launchPromotion()
{
    var promotion = getPromotion();

    if (promotion)
    {
        var posX = (screen.width - promotion[1])/2;
        var posY = (screen.height - promotion[2])/2;

        window.open(promotion[0], 'promotion', 'resizable=no,scrollbars=no,status=no,left=' + posX + ',top=' + posY + ',width=' + promotion[1] + ',height=' + promotion[2]);
    }
}

function getPromotion()
{
    var promotion;
    var viewedListValue = getCookie('VP');

    var vIndex = 0;
    var index = 0;

    if (viewedListValue)
    {
        var viewedList = viewedListValue.split('|').sort(numberOrder);

        for (;index < promotionList.length; index++)
        {
            if (vIndex == viewedList.length)
            {
                promotion = promotionList[index];
                break;
            }

            if (index < viewedList[vIndex])
            {
                promotion = promotionList[index];
                break;
            } else if (index == viewedList[vIndex])
            {
                index++;
                vIndex++;
            } else
            {
                index++;
            }
        }
    } else
    {
        promotion = promotionList[0];
    }

    if (promotion)
    {
        if (viewedListValue)
        {
            viewedListValue = viewedListValue + '|' + index;
        } else
        {
            viewedListValue = index;
        }

        var expiration = new Date();
        expiration.setFullYear(expiration.getFullYear() + 10);

        setCookie('VP', viewedListValue, expiration);

        return promotion;
    }

    return;
}

function numberOrder (a, b)
{
    return a - b;
}

