/**
// * this is a function that remove the added event
**/



var links = document.querySelectorAll("a");
for (index = 0; index < links.length; index++) {
    links[index].removeEventListener("click", on_click,false)
}
console.log("inactive all listener");
