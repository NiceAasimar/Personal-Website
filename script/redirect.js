let canRedirect = false;

function redirect() {
    if (!canRedirect) {
        alert("Site is not accessible at the moment. Please try again later");
        return;
    } else {
        window.open("main/home.html", "_self");
    };
};