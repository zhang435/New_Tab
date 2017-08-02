var btn = document.getElementById("status");
var bkg = chrome.extension.getBackgroundPage();
var currentmode = bkg.mode;
btn.innerHTML = bkg.status;
var modecontent = {
    "OR": "New tab will only `run` the link you want",
    "XOR": "New tab will NOT `run` the link you add",
    "ALL": "New tab will `run` EVERYTHING",

};
var mode = new Mode(currentmode, modecontent[currentmode]);

// assign the active anv bar
if (!document.getElementById(currentmode).classList.contains("is-active")) {
    document.getElementById(currentmode).classList.add("is-active");
}

// assign the mode content
function draw_urls() {
    chrome.storage.sync.get(currentmode, function (items) {
        mode.fill_html(items[currentmode]);
    });
}
draw_urls();

// dealing with different mode
Array.from(document.getElementsByTagName("a")).forEach(function (element) {
    element.addEventListener("click", function () {
        document.getElementById(currentmode).classList.remove("is-active");
        element.classList.add("is-active");
        // update mode in the memory
        chrome.storage.sync.set({"mode": element.innerHTML}, function () {
            bkg.mode = element.innerHTML;
            currentmode = bkg.mode;
            console.log("update mode : " + element.innerHTML);
            mode = new Mode(currentmode, modecontent[currentmode]);
            draw_urls();
        });
        chrome.runtime.sendMessage({text: "mode_change", status: btn.innerHTML});
    });
});
bkg.print(mode.src);

//////////////////////////////////////////////////////////////////////
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
btn.classList.add(btn.innerHTML === "running" ? "is-primary" : "is-warning");


//////////////////////////////////////////////////////////////////////
// get the new link that will be added
var add = document.getElementById("addurl");
add.addEventListener("click", function (elem) {

    var new_url = document.getElementById("url").value;
    document.getElementById("url").value = "";

    chrome.storage.sync.get(currentmode, function (items) {
        if (new_url === "")
            return;
        var ans = {};
        // if the item has not been create yet
        if (items[currentmode] === undefined) {
            // by doing this , we can sure variable as the key
            ans[currentmode] = [new_url];
            chrome.storage.sync.set(ans);
        } else {
            // add new url
            var temp = items[currentmode];
            if (temp.includes(new_url))
                return;
            temp.push(new_url);
            ans[currentmode] = temp;
            bkg.print("call function add row");
        }
        add_row(new_url, ans.length);
        chrome.storage.sync.set(ans, function () {
            bkg.print("append value " + new_url + " into " + currentmode + " URL array");
        });
    });
    bkg.rerun();
});

//////////////////////////////////////////////////////////////////////
// add new table into popup.html
function add_row(url, new_id) {
    var tb = document.getElementsByTagName("tbody")[0];
    var url_name = document.createElement("tr");
    url_name.setAttribute("id", url);
    url_name.innerHTML = "<a>" + url + "</a>";
    bkg.print("in");
    url_name.addEventListener("click", function (e) {
        bkg.print("been clicked");
        remove_url_from_table(url);
        bkg.rerun();
    });
    tb.appendChild(url_name);

    // var remove_button = document.createElement("tr");
    // remove_button.setAttribute("data-url", url);
    // remove_button.innerHTML = "<a></a>";
}

function remove_url_from_table(url) {
    chrome.storage.sync.get(currentmode, function (items) {
        var index = items[currentmode].indexOf(url);
        items[currentmode].splice(index, 1);
        var ans = {};
        ans[currentmode] = items[currentmode];
        chrome.storage.sync.set(ans);
    });

    document.getElementById(url).parentNode.removeChild(document.getElementById(url));
}
