let roulette = document.getElementById("roulette");

function spin() {
    roulette.style.transition = "transform 3s cubic-bezier(0.1, 0.7, 0.1, 1)";
    let offset = Math.floor(Math.random() * 300) + 500;
    roulette.style.transform = `translateX(-${offset}px)`;

    setTimeout(() => {
        Telegram.WebApp.sendData("spin");
    }, 3000);
}

function get500() {
    Telegram.WebApp.sendData("get500");
}