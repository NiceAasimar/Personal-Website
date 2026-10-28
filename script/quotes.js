import { buildButton } from "./main.js";
let ready = false;

const usedQuotes = new Set();

const randButton = document.getElementById("randButton");
const listButton = document.getElementById("listButton");
const quoteDiv = document.getElementById("quoteDiv");
const controls = document.getElementById("controls");
const controlDiv = document.getElementById("controlDiv");
const resetButton = document.getElementById("resetButton");

async function getQuotes() {
    const response = await fetch("data/quotes.json");
    if (!response.ok) throw new Error(`${response.status}`);
    return response.json();
};

class Quote {
    constructor(data) {
        Object.assign(this, data);
    };

    readable() {
        let quoteBody = [];
        quoteBody.push(this.text);

        if (this.translation != null) {
            quoteBody.push(`("${this.translation}")`)
        };

        let source = [this.author, this.source, this.subsource];
        let sourceData = [];
        for (let i = 0; i < source.length; i++) {
            if (source[i] == null) continue;
            let text;
            if (i == 1) {
                text = `<i>${source[i]}</i>`;
            } else {
                text = source[i];
            };
            sourceData.push(text);
        };
        let sourceLine = "— " + sourceData.join(", ");
        if (this.paraphrased) sourceLine += " (Paraphrased)";
        quoteBody.push(sourceLine);

        const quote = quoteBody.filter(p => p != null && p !== "").join("<br>");
        const node = document.createElement("p");
        node.innerHTML = quote;
        return node;
    }
};

function clean() {
    while (quoteDiv.hasChildNodes()) {
        quoteDiv.removeChild(quoteDiv.firstChild);
    }
    quoteDiv.hidden = true;
    controlDiv.hidden = false;

    const newButton = document.getElementById("newButton");
    if (newButton) {document.body.removeChild(newButton)};
    
    if (!quoteDiv.hasChildNodes()) {ready = true;}
    else {console.error("Could not confirm page is clean")};
}

function reset() {
    clean();
    usedQuotes.clear();
    resetButton.hidden = true;
    resetButton.disabled = true;
}

function randomQuote(quotes) {
    clean();
    if (!ready) {
        console.error("Page not ready")
        return;
    }
    ready = false;
    resetButton.hidden = false;
    resetButton.disabled = false;
    controlDiv.hidden = true;

    let heading = document.createElement("h2");
    heading.innerText = "Here's a random quote:";
    quoteDiv.appendChild(heading);

    let q;
    if (usedQuotes.size == quotes.length) {
        usedQuotes.clear();
    }
    while (usedQuotes.has(q) || q == undefined) {
        q = quotes[Math.floor(Math.random() * quotes.length)];
    }
    usedQuotes.add(q);
    quoteDiv.append(q.readable());

    quoteDiv.hidden = false;

    document.body.insertBefore(buildButton("newButton", "Give Me Another", () => randomQuote(quotes)), controlDiv);
};

function listQuotes(quotes) {
    clean();
    if (!ready) {
        console.error("Page not ready")
        return;
    }
    ready = false;
    resetButton.hidden = false;
    resetButton.disabled = false;

    let heading = document.createElement("h2");
    heading.innerText = "Here are my favourite quotes:";
    quoteDiv.appendChild(heading);

    quotes.forEach(q => {
        quoteDiv.appendChild(q.readable());
    });

    quoteDiv.hidden = false;
    controlDiv.hidden = true;
};

async function init() {
    try {
        const json = await getQuotes();
        const quotes = json.map(obj => new Quote(obj));
        randButton.addEventListener("click", () => randomQuote(quotes));
        listButton.addEventListener("click", () => listQuotes(quotes));
        resetButton.addEventListener("click", () => reset());
        controls.disabled = false;
        ready = true;
    } catch(err) {
        console.error("Couldn't load quotes:", err);
    }
};

init();