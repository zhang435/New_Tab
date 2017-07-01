/**
 * this is a function that add event listenr for all events
 **/
var links = document.querySelectorAll("a");
for (var index = 0; index < links.length; index++) {
    var org = "";
    if (links[index].hasAttribute("target")) {
        org = links[index].target;
    }

    if (!links[index].hasAttribute("target")) {
        links[index].setAttribute("target", "_blank");
    } else {
        if (!links[index].target !== "_blank") {
            links[index].setAttribute("target", "_blank");
        }
    }
    links[index].setAttribute("data-org", org);
}

console.log(String(links.length) + " links been listened");
