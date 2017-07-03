/**
// * this is a function that remove the added event
**/
var links = document.querySelectorAll("a");
for (index = 0; index < links.length; index++) {
    var org = links[index].getAttribute("data-org", org);
    if(org === "")
        links[index].removeAttribute("target");
    else
        links[index].setAttribute("target" , org);

}
console.log("inactive all listener");
