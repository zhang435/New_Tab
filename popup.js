// FIXME: when user change from running to suspend , the first click still keep open page in the default page 
var btn = document.getElementById("status");
btn.innerHTML = chrome.extension.getBackgroundPage().status;
btn.addEventListener("click", function(){
    var style = btn.classList[1];
    // if current status is running , then stop the extension
    if(btn.innerHTML === "running"){
        btn.classList.add("btn-warning");
        btn.innerHTML = "suspend";
        chrome.extension.getBackgroundPage().status = "suspend";
        chrome.extension.getBackgroundPage().print("suspend");
    } else {
        btn.classList.add("btn-primary");
        btn.innerHTML = "running";
        chrome.extension.getBackgroundPage().listen_all_links();
        chrome.extension.getBackgroundPage().status = "running";
        chrome.extension.getBackgroundPage().print("running");
    }
    chrome.runtime.sendMessage({text: "popup clicked", status: btn.innerHTML});
    btn.classList.remove(style);

});