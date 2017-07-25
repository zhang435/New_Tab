/**
 * this is a function that add event listenr for all events
 **/
var links = document.querySelectorAll("a");
for (var index = 0; index < links.length; index++) {
    console.log("???");
    if (!links[index].hasAttribute("target")) {
        links[index].setAttribute("target", "_blank");
        links[index].setAttribute("data-changed" ,"");
    } else {
        if (!links[index].getAttribute("target") !== "_blank") {
            links[index].setAttribute("data-changed" , links[index].getAttribute("target"));
            links[index].setAttribute("target", "_blank");
        }
    }

}

console.log(String(links.length) + " links been listened");
