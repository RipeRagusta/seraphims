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

    const randomizedSvg = "data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100.26458mm\" height=\"100.26458mm\" viewBox=\"0 0 100.26458 100.26458\"><g transform=\"translate(-20.567797,-60.681898)\"><rect style=\"fill:" + selectedTheme.background.replace("#", "%23") + ";stroke:%23ffb6c1;stroke-width:0.265\" width=\"100\" height=\"100\" x=\"20.700089\" y=\"60.81419\"/><g style=\"fill:" + selectedTheme.color.replace("#", "%23") + ";stroke:%23ffb6c1;stroke-width:0.264999\" transform=\"translate(-11.117143,1.3530779)\"><path d=\"m 108.25063,122.33715 q 0,8.91418 -6.63181,13.65118 -6.58874,4.69394 -19.37865,4.69394 -11.670255,0 -18.30206,-4.13411 -6.631805,-4.13411 -8.526607,-12.53153 l 12.273146,-2.02399 q 1.248847,4.82313 4.866195,7.01938 3.617348,2.15318 10.033835,2.15318 13.306674,0 13.306674,-8.09597 0,-2.58382 -1.550292,-4.2633 -1.507228,-1.67949 -4.306367,-2.79914 -2.756075,-1.11966 -10.636726,-2.71301 -6.80406,-1.59336 -9.474008,-2.54076 -2.669947,-0.99046 -4.823131,-2.28237 -2.153184,-1.33498 -3.660412,-3.18671 -1.507228,-1.85174 -2.368502,-4.34944 -0.81821,-2.497688 -0.81821,-5.727463 0,-8.225161 6.158105,-12.574592 6.201169,-4.392495 18.000615,-4.392495 11.282681,0 16.924022,3.531221 5.684403,3.531221 7.320823,11.670255 l -12.316209,1.679483 q -0.947401,-3.918794 -3.87573,-5.899723 -2.885266,-1.980928 -8.311289,-1.980928 -11.541063,0 -11.541063,7.234696 0,2.368502 1.205783,3.875731 1.248846,1.507228 3.660412,2.583815 2.411565,1.03353 9.775453,2.62689 8.741925,1.85174 12.488464,3.44509 3.789599,1.55029 5.985849,3.66041 2.19625,2.06706 3.35897,4.99539 1.16272,2.88527 1.16272,6.67487 z\"/></g></g></svg>";
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