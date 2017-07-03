var btn = document.getElementById("status");
var mode = document.getElementById("mode");

var bkg = chrome.extension.getBackgroundPage();
var currentmode = bkg.mode;
btn.innerHTML = bkg.status;

// check if the back memory been inited yet
// if it been init , then it eill get coorect mode
// if it is the first time using it, it will be the default XOR mode

mode.src = "../html/"+currentmode.toLowerCase()+"html";

// assign the active anv bar
if(!document.getElementById(currentmode).classList.contains("is-active")){
    document.getElementById(currentmode).classList.add("is-active");
}
// switch mode tab
Array.from(document.getElementsByTagName("a")).forEach(function (element) {
    element.addEventListener("click", function () {
        bkg.print(element);
        document.getElementById(currentmode).classList.remove("is-active");
        element.classList.add("is-active");
        // update mode in the memory
        chrome.storage.sync.set({ "mode" : element.innerHTML }, function() {
            bkg.mode = element.innerHTML;
            currentmode = bkg.mode;
            console.log("update mode : "+ element.innerHTML );
            mode.src = "../html/"+currentmode.toLowerCase()+"html";
        });
    });
});




//////////////////////////////////
// dealing with running/suspend button
bkg.print("current status is " + btn.innerHTML);
btn.addEventListener("click", function () {
    var style = btn.classList[1];
    // if current status is running , then stop the extension
    if (btn.innerHTML === "running") {
        // btn.classList.add("btn-warning");
        bkg.remove_listener();
        btn.innerHTML = "suspend";
        bkg.status = "suspend";
        bkg.print("suspend");
    } else {
        // btn.classList.add("btn-primary");
        btn.innerHTML = "running";
        bkg.listen_all_links();
        bkg.status = "running";
        bkg.print("running");
    }
    chrome.runtime.sendMessage({text: "popup clicked", status: btn.innerHTML});
    btn.classList.remove(style);
    btn.classList.add(btn.innerHTML === "running" ? "is-primary" : "is-warning");
});
bkg.print("switch color : status button");
btn.classList.add(btn.innerHTML === "running" ? "is-primary" : "is-warning");
