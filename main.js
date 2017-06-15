var links = document.querySelectorAll("a");
for (index = 0; index < links.length; index++) {
    console.log("apple");
    console.log(links[index].href);
    links[index].addEventListener("click", function(event) {
        window.open(this.href);
        console.log("event handled");
        event.preventDefault();
    })
}
