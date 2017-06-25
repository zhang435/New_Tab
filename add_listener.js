/**
 * this is a function that add event listenr for all events
 **/

var links = document.querySelectorAll("a");
// this prevent the same links been open twice, I spend many time to find the reason why this happen
// but did not see the reason why it been open twice... so just a dummy way to solve it
var prev = "";
// listener for all click
function on_click(event){
    console.log(this);
    event.preventDefault();

    // prevent the duplicate happen
    if(this.href != prev  && !this.classList.contains("external") && !this.getAttribute("target") !== ("_blank")){
        console.log(String(this.href) + " been clicked");
        var newtab = window.open(this.href, '_blank');
        newtab.focus();
        prev = this.href;
    }else{
        console.log("duplicate event been prevent");
    }
}


for (var index = 0; index < links.length; index++) {
    links[index].addEventListener("click", on_click);
}

console.log(String(links.length) + " links been listened");
