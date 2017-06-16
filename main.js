var links = document.querySelectorAll("a");
for (index = 0; index < links.length; index++) {
    links[index].addEventListener("click", function (event) {
        console.log(this);
        console.log(String(this.href) + " been clicked");
        var newtab = window.open(this.href, '_blank');
        newtab.focus();
        console.log("tab focus been switch");

        // chrome.tabs.create(createProperties, function () {});
        event.preventDefault();
    })
}
console.log(String(links.length) + "Total tabs been listend");