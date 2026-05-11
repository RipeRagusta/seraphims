function getRandMinMax(min, max)
{
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function getLuckyNumber()
{
    return getRandMinMax(1, 999);
}

function initalize()
{
    document.getElementById("lucky").textContent = getLuckyNumber();
}