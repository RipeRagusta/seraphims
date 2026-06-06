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
        { name: "standard", id: 1, background: "#99ffcc", color: "#ff3399" },
        { name: "yellowblue", id: 2, background: "#33cccc", color: "#ffff00" },
        { name: "camo", id: 3, background: "#00cc00", color: "#ff0000" },
        { name: "flesh", id: 4, background: "#ffb6c1", color: "#ffff00" },
        { name: "simple", id: 5, background: "#ffffff", color: "#000000" },
        { name: "purpleblue", id: 6, background: "#000000", color: "#0000ff" },
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
            if (hasLeftPage)
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

    do
    {
        randomID = getRandMinMax(1, defaultColors.length);
    }
    while(randomID === currentPage)

    currentPage = randomID

    if(checkStorage() === true)
    {
        localStorage.setItem("currentPage", currentPage);
    }

    let selectedTheme = defaultColors.find(theme => theme.id === randomID);

    document.documentElement.style.setProperty("--backgroundColor", selectedTheme.background);
    document.documentElement.style.setProperty("--color", selectedTheme.color);

    const fgPath = "m 58.856597,124.27501 h 2.799138 l 1.507229,7.79453 q 1.593356,2.02399 5.469086,3.57428 3.918794,1.5503 7.708397,1.5503 6.028914,0 9.38788,-3.05753 3.40203,-3.10058 3.40203,-8.5266 0,-3.10059 -1.334974,-5.12458 -1.29191,-2.02399 -3.445093,-3.40203 -2.11012,-1.4211 -4.823131,-2.3685 -2.713012,-0.99047 -5.598278,-1.98093 -2.842202,-0.99046 -5.555213,-2.19625 -2.713011,-1.20578 -4.866195,-3.05752 -2.11012,-1.85174 -3.445093,-4.56475 -1.291911,-2.75607 -1.291911,-6.760993 0,-6.890187 5.167641,-10.808981 5.16764,-3.918794 14.340202,-3.918794 6.976315,0 15.158412,1.851738 V 95.293164 H 90.637586 L 89.130357,88.230722 Q 84.737863,85.04401 78.278312,85.04401 q -5.770532,0 -9.043371,2.368502 -3.229775,2.325438 -3.229775,6.459551 0,2.799138 1.29191,4.650876 1.334974,1.851741 3.445094,3.186711 2.153183,1.29191 4.866195,2.23931 2.756074,0.9474 5.598277,1.98093 2.885266,0.99046 5.598277,2.28238 2.756075,1.24884 4.866195,3.22977 2.153183,1.93787 3.445093,4.78007 1.334974,2.79914 1.334974,6.93325 0,8.35435 -5.124577,12.96216 -5.124577,4.56475 -14.770839,4.56475 -4.650876,0 -9.344816,-0.81821 -4.69394,-0.81821 -8.354352,-2.23931 z";
    const randomizedSvg = "data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"20.567797 60.681898 100.26458 100.26458\"><rect x=\"20.700089\" y=\"60.81419\" width=\"100\" height=\"100\" fill=\"" + selectedTheme.background.replace("#", "%23") + "\"/><g transform=\"translate(-6.9107381,-0.24027811)\"><path d=\"" + fgPath + "\" fill=\"" + selectedTheme.color.replace("#", "%23") + "\"/></g></svg>";

    document.querySelector("link[rel=\"shortcut icon\"]").href = randomizedSvg;
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