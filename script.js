function getRandMinMax(min, max)
{
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function getLuckyNumber()
{
    return getRandMinMax(1, 999);
}

function newLuckyNumber()
{
    let luckyNumber = getLuckyNumber();
    localStorage.setItem("epoch", Date.now());
    localStorage.setItem("luckyNumber", luckyNumber);
    document.getElementById("lucky").textContent = luckyNumber;
}

function initialize()
{
    let luckyNumber;

    if(checkStorage() === true)
    {
        if(localStorage.getItem("epoch") === null)
        {
            newLuckyNumber();
        }
        else
        {
            let previousEpoch = parseInt(localStorage.getItem("epoch"));
            let currentEpoch = parseInt(Date.now());

            if(currentEpoch - previousEpoch > 86400000)
            {
                newLuckyNumber();
            }
            else
            {
                if(localStorage.getItem("luckyNumber") === null)
                {
                   newLuckyNumber();
                }
                else
                {
                    luckyNumber = localStorage.getItem("luckyNumber");
                    document.getElementById("lucky").textContent = luckyNumber;
                }
            }
        }
    }
    else
    {
        luckyNumber = getLuckyNumber();
        document.getElementById("lucky").textContent = luckyNumber;
    }
}

function checkStorage()
{
    var test = "test";

    try 
    {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } 
    catch(e)
    {
        return false;
    }
}