function retrieveTrails() {
    const xhr = new XMLHttpRequest();
    const url = "trail.json";

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            var trails = JSON.parse(xhr.response).trails;
            displayTrails(trails);

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

function displayTrails(trails) {
    trails.forEach(addRow);
}

function addRow(trail) {
    var tcontent = document.getElementById("tcontent");
    var row = tcontent.insertRow();

    var nameCell = row.insertCell();
    nameCell.setAttribute('data-label', "English");
    nameCell.innerHTML = trail.Title_en;

    var addressCell = row.insertCell();
    addressCell.setAttribute('data-label', "Chinese (Traditional)");
    addressCell.innerHTML = trail.Title_tc;

    var mobileCell = row.insertCell();
    mobileCell.setAttribute('data-label', "Chinese (Simplified)");
    mobileCell.innerHTML = trail.Title_sc;
}
