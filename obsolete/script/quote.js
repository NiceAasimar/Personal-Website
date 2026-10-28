const usedQuotes = new Set();
let random;
let pickedQuote;
let haveTrans;
const listDiv = document.getElementById("listDiv");
const listButton = document.getElementById("listButDiv");
const quoteBut = document.getElementById("quoteButDiv");

function resetPage() {
    if (document.getElementById("quoteHead") != null) {
        document.getElementById("quoteHead").remove();
        document.getElementById("quoteBody").remove();
        document.getElementById("quoteAuthor").remove();
        try {
            document.getElementById("quoteTranslation").remove();
        } catch {};
        document.getElementById("quoteButton").textContent = "Give Me a Quote";
    }
}

const quotes = [
    {
        text: "Ubi concordia, ibi victoria.",
        translation: "Where there is unity, there is there victory.",
        author: "Publius Syrus"
    },
    {
        text: "Una salus victis, nullam sperare salutem.",
        translation: "The only salvation for the defeated is to hope for no salvation.",
        author: "P. Vergilius Maro"
    },
    {
        text: "Flectere si nequeo superos, Acheronta movebo.",
        translation: "If I cannot bend the will of Heaven, I shall move Hell instead.",
        author: "P. Vergilius Maro"
    },
    {
        text: "Dum spiro, spero.",
        translation: "While I breathe, I hope.",
        author: "Cicero"
    },
    {
        text: "Only two things are infinite, the universe and human stupidity, and I'm not sure about the former.",
        translation: "",
        author: "Albert Einstein"
    },
    {
        text: "The world is a dangerous place to live; not because of the people who are evil, but because of the people who don't do anything about it.",
        translation: "",
        author: "Albert Einstein"
    },
    {
        text: "Education is what remains after one has forgotten what one has learned in school.",
        translation: "",
        author: "Albert Einstein"
    },
    {
        text: "That which will not bend must break, and that which can be destroyed by truth should never be spared its demise.",
        translation: "",
        author: "Lucien Greaves"
    },
    {
        text: "A scarlet stain upon the Earth.",
        translation: "",
        author: "Sappho"
    },
    {
        text: "Sweet mother, I cannot weave – slender Aphrodite has overcome me with longing for a girl.",
        translation: "",
        author: "Sappho"
    },
    {
        text: "Someone will remember us.",
        translation: "",
        author: "Sappho"
    },
    {
        text: "Hope in the shadow of fear is the world’s most powerful motivator.",
        translation: "",
        author: "Neal Shusterman, <i>Scythe</i>"
    },
    {
        text: "I decided as long as I'm going to hell, I might as well do it thoroughly.",
        translation: "",
        author: "Stephanie Meyer, <i>Twilight<i>"
    },
    {
        text: "Every time someone steps up and says who they are, the world becomes a better, more interesting place.",
        translation: "",
        author: "Raymond Holt, <i>Brooklyn Nine-Nine<i>"
    },
    {
        text: "Whenever you find yourself on the side of the majority, it is time to pause and reflect.",
        translation: "",
        author: "Mark Twain"
    },
    {
        text: "Fairy tales are more than true: not because they tell us dragons exist, but because they tell us dragons can be beaten.",
        translation: "",
        author: "Neil Gaiman"
    }
];

function randInt() {
    random = Math.floor(Math.random() * quotes.length);
}

function createResetButton(text) {
    if (document.getElementById("resetButton") === null) {
        const resetButton = document.createElement("button");
        const resetNode = document.createTextNode("Reset");
        resetButton.appendChild(resetNode);
        text.insertBefore(resetButton, endDiv);
        resetButton.setAttribute("id", "resetButton");
        resetButton.setAttribute("onclick", "resetAll();");
    }
}

function resetAll() {
    resetPage();
    usedQuotes.clear();
    listDiv.hidden = true;
    listButDiv.style.display = "block";
    const resetB = document.getElementById("resetButton");
    resetB.remove();
    quoteBut.style.display = "block";
}

function testQuote() {
    if (usedQuotes.size == quotes.length) {
        usedQuotes.clear();
    }
    do {
        randInt();
    } while (usedQuotes.has(random));
           usedQuotes.add(random);
            pickedQuote = random;
}

function giveQuote() {
    resetPage();
    testQuote();
    const text = document.getElementById("docBody");
    const randomQuote = quotes[pickedQuote].text;
    
    const randAuth = quotes[pickedQuote].author;
    const heading = document.createElement("h2");
    const headNode = document.createTextNode("Here's your random quote:");
    heading.appendChild(headNode);
    const button = document.getElementById("quoteButton");
    text.insertBefore(heading, quoteBut);
    heading.setAttribute("id", "quoteHead")
    const quote = document.createElement("p");
    const node = document.createTextNode(randomQuote);
    quote.appendChild(node);
    quoteBut.insertBefore(quote, button);
    quote.setAttribute("id", "quoteBody");
    if (quotes[pickedQuote].translation != "") {
        const randTrans = quotes[pickedQuote].translation;
        const trans = document.createElement("p");
        trans.innerHTML = `("${randTrans}")`;
        quoteBut.insertBefore(trans, button);
        trans.setAttribute("id", "quoteTranslation");
    };
    const auth = document.createElement("p");
    auth.innerHTML = `— ${randAuth}`
    // const authNode = document.createTextNode("—" + randAuth);
    // auth.appendChild(authNode);
    quoteBut.insertBefore(auth, button);
    auth.setAttribute("id", "quoteAuthor");
    // const buttonNode = document.createTextNode("Give Me Another");
    button.textContent = "Give Me Another";
    createResetButton(text);
    listButton.style.display = "none";
}

function listQuotes() {
    if (listDiv.hidden == true) {
        if (listDiv.innerHTML.trim() === "") {
            const listHead = document.createElement("h2");
            listHead.innerText = "Here's the list of quotes:"
            listDiv.appendChild(listHead);
            quotes.forEach(quoteObj => {
                const quotePara = document.createElement("p");
                if (quoteObj.translation != "") {
                    quotePara.innerHTML = `${quoteObj.text}<br>("${quoteObj.translation}")<br>— ${quoteObj.author}`;
                } else {
                    quotePara.innerHTML = `${quoteObj.text}<br>— ${quoteObj.author}`;
                }
                listDiv.appendChild(quotePara);
            });
        }

        const text = document.getElementById("docBody");
        resetPage();
        listDiv.hidden = false;
        listButton.style.display = "none";
        quoteBut.style.display = "none";
        createResetButton(text);
    } else {
        alert("Error. How did you do that?")
    }
}