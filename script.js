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

var currentPage;
var defaultColors;

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

    defaultColors = 
    [
        { name: "standard", id: 1, background: "#99ffcc", color: "#ff3399", favicon: "./assets/favicons/standard.svg" },
        { name: "yellowblue", id: 2, background: "#33cccc", color: "#ffff00", favicon: "./assets/favicons/yellowblue.svg" },
        { name: "camo", id: 3, background: "#009933", color: "#ff6600", favicon: "./assets/favicons/camo.svg" },
        { name: "flesh", id: 4, background: "#ffb6c1", color: "#ffff00", favicon: "./assets/favicons/flesh.svg" },
        { name: "simple", id: 5, background: "#ffffff", color: "#000000", favicon: "./assets/favicons/simple.svg" },
        { name: "dark", id: 6, background: "#000000", color: "#ffffff", favicon: "./assets/favicons/dark.svg" },
        { name: "darkandblue", id: 7, background: "#000000", color: "#0000ff", favicon: "./assets/favicons/darkandblue.svg" },
        { name: "redandwhite", id: 8, background: "#ffffff", color: "#ff0000", favicon: "./assets/favicons/redandwhite.svg" },
    ];

    if(checkStorage() === true)
    {
        if(localStorage.getItem("currentPage") !== null)
        {
            currentPage = parseInt(localStorage.getItem("currentPage"));
        }
    }

    randomizeColors();

    let hasLeftPage = false;

    document.addEventListener("visibilitychange", () => 
    {
        if(document.hidden) 
        {
             hasLeftPage = true;
        } 
        else 
        {
            if(hasLeftPage)
            {
                randomizeColors();
                hasLeftPage = false;
            }
        } 
    });
}

function getRandMinMax(min, max)
{
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function randomizeColors()
{
    let randomID;
    let selectedTheme;

    do
    {
        randomID = getRandMinMax(1, defaultColors.length);
        selectedTheme = defaultColors.find(theme => theme.id === randomID);
    }
    while 
    (
        (randomID === currentPage) || 
        (selectedTheme.background === (defaultColors.find(theme => theme.id === currentPage).background)) ||
        (selectedTheme.color === (defaultColors.find(theme => theme.id === currentPage).color))
    );

    currentPage = randomID

    if(checkStorage() === true)
    {
        localStorage.setItem("currentPage", currentPage);
    }

    document.documentElement.style.setProperty("--backgroundColor", selectedTheme.background);
    document.documentElement.style.setProperty("--color", selectedTheme.color);
    document.querySelector("link[rel=\"shortcut icon\"]").href = selectedTheme.favicon;
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