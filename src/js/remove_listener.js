/**
// * this is a function that remove the added event
**/
var links = document.querySelectorAll("a");
for (index = 0; index < links.length; index++) {
    console.log("/??");
    var org = links[index].getAttribute("data-changed");
    if(org){
        links[index].removeAttribute("target");
        links[index].removeAttribute("data-changed");
    }
    else
        links[index].setAttribute("target" , org);
}
console.log("inactive all listener");
