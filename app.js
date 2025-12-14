Telegram.WebApp.ready();

const rouletteEl = document.getElementById("roulette");
const spinBtn = document.getElementById("spinBtn");
const resultBox = document.getElementById("result");
const resultText = document.getElementById("resultText");

let currentItem = null;
let balance = 500;
let inventory = [];

document.getElementById("balance").textContent = balance;

const items = [
    { name: "Common", class: "common", price: 50 },
    { name: "Rare", class: "rare", price: 150 },
    { name: "Epic", class: "epic", price: 400 },
    { name: "Legendary", class: "legendary", price: 1000 },
];

function openRoulette() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("rouletteScreen").classList.remove("hidden");
}

function openInventory() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("inventoryScreen").classList.remove("hidden");
    renderInventory();
}

function backToMenu() {
    document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
    document.getElementById("menu").classList.remove("hidden");
}

function createRouletteItems() {
    rouletteEl.innerHTML = "";
    for (let i = 0; i < 40; i++) {
        const item = items[Math.floor(Math.random() * items.length)];
        const div = document.createElement("div");
        div.className = `item ${item.class}`;
        div.textContent = item.name;
        rouletteEl.appendChild(div);
    }
}

spinBtn.onclick = () => {
    if (balance < 100) return alert("Недостаточно средств");

    balance -= 100;
    document.getElementById("balance").textContent = balance;

    resultBox.classList.add("hidden");
    spinBtn.disabled = true;

    createRouletteItems();
    rouletteEl.style.transition = "none";
    rouletteEl.style.transform = "translateX(0)";

    requestAnimationFrame(() => {
        rouletteEl.style.transition = "transform 7s cubic-bezier(0.1, 0.7, 0.1, 1)";
        const index = Math.floor(Math.random() * items.length);
        currentItem = items[index];
        rouletteEl.style.transform = `translateX(-2200px)`;
    });

    setTimeout(() => {
        resultText.textContent = `Вы выбили: ${currentItem.name}`;
        resultBox.classList.remove("hidden");
        spinBtn.disabled = false;
    }, 7000);
};

function sellItem() {
    balance += currentItem.price;
    document.getElementById("balance").textContent = balance;
    Telegram.WebApp.sendData("sell");
    resultBox.classList.add("hidden");
}

function saveItem() {
    inventory.push(currentItem);
    Telegram.WebApp.sendData("save");
    resultBox.classList.add("hidden");
}

function renderInventory() {
    const inv = document.getElementById("inventory");
    inv.innerHTML = "";
    inventory.forEach(i => {
        const div = document.createElement("div");
        div.className = `item ${i.class}`;
        div.textContent = i.name;
        inv.appendChild(div);
    });
}
