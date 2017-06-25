/**
// * this is a function that remove the added event
**/
var links = document.querySelectorAll("a");
for (index = 0; index < links.length; index++) {
    links[index].removeEventListener("click", function (event) {
    })
}
console.log("inactive all listener");
