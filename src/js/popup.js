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
function populate_urls() {
    chrome.storage.sync.get(currentmode, function (items) {
        mode.fill_html(items[currentmode]);
    });
}
populate_urls();

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
            populate_urls();
        });
        chrome.runtime.sendMessage({text: "mode_change", status: btn.innerHTML});
    });
});

//////////////////////////////////////////////////////////////////////
// dealing with running/suspend button
bkg.print("current status is " + btn.innerHTML);
btn.addEventListener("click", function () {
    // if current status is running , then stop the extension
    if (btn.innerHTML === "running") {
        btn.classList = "button is-large is-warning";
        bkg.remove_listener();
        btn.innerHTML = "suspend";
        bkg.status = "suspend";
    } else {
        btn.classList = "button is-large is-primary";
        bkg.listen_all_links();
        btn.innerHTML = "running";
        bkg.status = "running";
    }
    chrome.runtime.sendMessage({text: "popup clicked", status: btn.innerHTML});
    btn.classList.remove(style);
});
// the first time when user start the popup
if(btn.classList.length === 2){
    btn.classList.add(btn.innerHTML === "running" ? "is-primary" : "is-warning");
}



//////////////////////////////////////////////////////////////////////
// get the new link that will be added

document.getElementById("addurl").addEventListener("click", function (elem) {

    var new_url = document.getElementById("url").value;
    document.getElementById("url").value = "";
    bkg.chrome_add_url(new_url);
    var tb = document.getElementsByTagName("tbody")[0].innerHTML;
    if(tb.indexOf("<a>"+new_url+"</a>") === -1)
        add_row(new_url);
    bkg.rerun();
});

//////////////////////////////////////////////////////////////////////
// add new table into popup.html
function add_row(url, new_id) {
    var tb = document.getElementsByTagName("tbody")[0];
    var url_name = document.createElement("tr");
    url_name.setAttribute("id", url);
    url_name.innerHTML = "<td><a>" + url + "</a></td>" +
        "<td><i class='material-icons button edit'>delete</i></td>";
    tb.appendChild(url_name);

    url_name.addEventListener("click", function (e) {
        remove_url_from_table(url);
        bkg.rerun();
    });

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


function get_cur_url() {
    chrome.tabs.getSelected(null,function(tab) {
        var tablink = tab.url;
        bkg.print(tablink);
        document.getElementById("url").setAttribute("value", tab.url);
    });
}

get_cur_url();

