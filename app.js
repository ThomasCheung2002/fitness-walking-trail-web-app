function initialize() {
    var status = "* Offline *";
    if (navigator.onLine) {
        status = "* Online *";
        retrieve();
    } else {
        const localStorage = window.localStorage;
        if (localStorage) {
            const trails = localStorage.getItem("trails");
            if (trails) {
                displayContacts(JSON.parse(trails));
            }
        }
    }

    document.getElementById("status").innerHTML = status;

    document.body.addEventListener(
        "online",
        function() {
            document.getElementById("status").innerHTML = "Online";
        },
        false
    );
    document.body.addEventListener(
        "offline",
        function() {
            document.getElementById("status").innerHTML = "Offline";
        },
        false
    );
}

function retrieve() {
    const xhr = new XMLHttpRequest();
    const url = "trail.json";

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            var trails = JSON.parse(xhr.response).trails;
            displayContacts(trails);

            // Store contact data to localstorage
            const localStorage = window.localStorage;
            if (localStorage) {
                localStorage.setItem("trails", JSON.stringify(trails));
            }
        }
    };

    xhr.open("get", url);
    xhr.send();
}

function displayContacts(trails) {
    trails.forEach(addRow);
}

function addRow(trails) {
    var tcontent = document.getElementById("tcontent");
    var row = tcontent.insertRow();

    var nameCell = row.insertCell();
    nameCell.setAttribute('data-label', "Title_en");
    nameCell.innerHTML = trails.Title_en;

    var addressCell = row.insertCell();
    addressCell.setAttribute('data-label', "Title_tc");
    addressCell.innerHTML = trails.Title_tc;

    var mobileCell = row.insertCell();
    mobileCell.setAttribute('data-label', "Title_sc");
    mobileCell.innerHTML = trails.Title_sc;
}
