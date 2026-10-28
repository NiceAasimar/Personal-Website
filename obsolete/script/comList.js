const listBut = document.getElementById('comListButDiv');
const picBut = document.getElementById('picButDiv');
const comDiv = document.getElementById('comicDiv');
const picDiv = document.getElementById('picDiv');
const comListButton = document.getElementById('comListButton');
const picButton = document.getElementById('picButton');
const topButton = document.getElementById('topButton');
const vol4Div = document.getElementById('vol4Div');
const vol4But = document.getElementById('vol4But');

function showList() {
    if (comDiv.hidden) {
        comDiv.hidden = false;
        comListButton.innerText = "Hide List"
        topButton.style.display = "inline"
    } else {
        comDiv.hidden = true;
        comListButton.innerText = "List What I Own"
        if (picDiv.hidden) {
            topButton.style.display = "none"
        }
    }
}

function showPics () {
    if (picDiv.hidden) {
        picDiv.hidden = false;
        picButton.innerText = "Hide Pictures"
        topButton.style.display = "inline"
    } else {
        picDiv.hidden = true;
        picButton.innerText = "See Pictures"
        if (comDiv.hidden) {
            topButton.style.display = "none"
        }
    }
}

function vol4Show() {
    if (vol4Div.hidden) {
        vol4Div.hidden = false;
        vol4But.innerText = "Hide";
    } else {
        vol4Div.hidden = true;
        vol4But.innerText = "Show";
    }
}
