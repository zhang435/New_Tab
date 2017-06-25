// FIXME: when user change from running to suspend , the first click still keep open page in the default page
// FIXME: after couple times redirect, the tab will open twice
var btn = document.getElementById("status");
var bkg = chrome.extension.getBackgroundPage();
btn.innerHTML = bkg.status;
bkg.print("current status is "+btn.innerHTML);
btn.addEventListener("click", function(){
    var style = btn.classList[1];
    // if current status is running , then stop the extension
    if(btn.innerHTML === "running"){
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
    btn.classList.add(btn.innerHTML === "running" ? "btn-primary" : "btn-warning")
});
bkg.print("I am changing the color");
btn.classList.add(btn.innerHTML === "running" ? "btn-primary" : "btn-warning")
