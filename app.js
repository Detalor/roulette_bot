const roulette = document.getElementById("roulette");
const spinBtn = document.getElementById("spinBtn");

Telegram.WebApp.ready();

const items = [
    { name: "Common", class: "common" },
    { name: "Rare", class: "rare" },
    { name: "Epic", class: "epic" },
    { name: "Legendary", class: "legendary" },
];

const ITEM_WIDTH = 120;
const TOTAL_ITEMS = 30;

function createItems() {
    roulette.innerHTML = "";
    for (let i = 0; i < TOTAL_ITEMS; i++) {
        const item = items[Math.floor(Math.random() * items.length)];
        const div = document.createElement("div");
        div.className = `item ${item.class}`;
        div.textContent = item.name;
        roulette.appendChild(div);
    }
}

spinBtn.onclick = () => {
    spinBtn.disabled = true;
    createItems();

    roulette.style.transition = "none";
    roulette.style.transform = "translateX(0)";

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            roulette.style.transition = "transform 4s cubic-bezier(0.15, 0.6, 0.1, 1)";

            const centerOffset = (TOTAL_ITEMS / 2) * ITEM_WIDTH;
            const randomShift = Math.floor(Math.random() * ITEM_WIDTH);

            roulette.style.transform = `translateX(-${centerOffset + randomShift}px)`;
        });
    });

    setTimeout(() => {
        Telegram.WebApp.sendData("spin");
        spinBtn.disabled = false;
    }, 4000);
};
