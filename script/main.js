export function buildButton(id, text, f) {
    const button = document.createElement("button");
    button.id = id;
    button.innerText = text;
    if (f) {button.addEventListener("click", f)};
    return button;
}