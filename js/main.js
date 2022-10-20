var sn = document.querySelector("#siteName");
var su = document.querySelector("#siteUrl");
var allSites = [];
var globalIndx = 0;

// condition to check if local storage is null or not
if (localStorage.getItem("allSites") != null) {
    allSites = JSON.parse(localStorage.getItem("allSites"));
    displayall();
}

// function to submit data
function submitData() {
    if (isFound()) {
        
    
    if (document.querySelector("#submitdata").innerHTML == "Submit") {
        if (checkNameValidation() && checkUrlValidation()) {
            var site = {
                name: sn.value,
                url: su.value,
            }

            allSites.push(site);
            localStorage.setItem("allSites", JSON.stringify(allSites));
            displayall();
            clearInputs();
            removeMessage();
        }
        else {
            websiteNameMessage();
            websiteUrleMessage();
        }
    }
    else {
        if (checkNameValidation() && checkUrlValidation()) {
            allSites[globalIndx].name = sn.value;
        allSites[globalIndx].url = su.value;
        displayall();
        clearInputs();
        removeMessage();

        localStorage.setItem("allSites", JSON.stringify(allSites));
        document.querySelector("#submitdata").innerHTML = "Submit";
        }
        else {
            websiteNameMessage();
            websiteUrleMessage();
        }
    
    }
}
else{
    document.querySelector("#nameError").innerHTML = `<p class="bg-warning text-dark rounded-2">This name is already exist</p>`;

}
}

// function to display data for user
function displayall() {
    var box = "";
    for (var i = 0; i < allSites.length; i++) {
        box += `
        <tr>
            <td>${i + 1}</td>
            <td class="text-success">${allSites[i].name}</td>
            <th><a target="_blank" href="${allSites[i].url}"><button class="btn btn-warning py-1 px-3">Visit</button></a></th>
            <th><button class="btn btn-success py-1 px-3" onclick="updateElement(${i})">Update</button></th>
            <th><button class="btn btn-danger py-1 px-3" onclick="deleteElement(${i})">Delete</button></th>
        </tr>`;
    }
    document.querySelector("tbody").innerHTML = box;
}

// function to clear inputs
function clearInputs() {
    sn.value = "";
    su.value = "";

}

// fnction to delete element from table
function deleteElement(indx) {
    allSites.splice(indx, 1);
    localStorage.setItem("allSites", JSON.stringify(allSites));
    displayall();
}

// function to check the validation of website's name
function checkNameValidation() {
    var regx = /^[\x00-\x7F]{1,35}$/; // This expression [\x00-\x7F] equivelant to all ASCII Characters
    return regx.test(sn.value);
}


// function to check the validation of website's URL
function checkUrlValidation() {
    var regx = /^(https:\/\/)[\x00-\x7F]{4,}$/;
    return regx.test(su.value);
}

// fucntion to display message for user for wrong input of the webiste's name
function websiteNameMessage() {
    if (!checkNameValidation()) {
        return document.querySelector("#nameError").innerHTML = `<p class="bg-warning text-dark rounded-2">Please enter the website's name</p>`;
    }
    else if (checkNameValidation() && !checkUrlValidation()) {
        return document.querySelector("#nameError").innerHTML = `<p class="bg-warning text-dark rounded-2"></p>`;
    }  
}

// fucntion to display message for user for wrong input of the webiste's URL
function websiteUrleMessage() {
    if (!checkUrlValidation()) {
        document.querySelector("#urlError").innerHTML = `<p class="bg-warning text-dark rounded-2">Please enter valid URL start with <span class="fw-bold">"https://"</span></p>`;

    }
    else if (!checkNameValidation() && checkUrlValidation()) {
        document.querySelector("#urlError").innerHTML = `<p class="bg-warning text-dark"></p>`;
    } 
}

//function to remove the validation message
function removeMessage() {
    document.querySelector("#nameError").innerHTML = `<p class="bg-warning text-dark"></p>`;
    document.querySelector("#urlError").innerHTML = `<p class="bg-warning text-dark"></p>`;

}

//function to update an element was entered
function updateElement(indx) {
    globalIndx = indx;
    sn.value = allSites[indx].name;
    su.value = allSites[indx].url;
    document.querySelector("#submitdata").innerHTML = "Update";

}

// function to search for website name 
function search(term) {
    var box = "";
    var no = 1;
    for (var i = 0; i < allSites.length; i++) {
        if (allSites[i].name.toLowerCase().trim().indexOf(term.toLowerCase().trim()) == 0) {
            box += `
                <tr>
                    <td>${no}</td>
                    <td class="text-success">${allSites[i].name}</td>
                    <th><a target="_blank" href="${allSites[i].url}"><button class="btn btn-warning py-1 px-3">Visit</button></a></th>
                    <th><button class="btn btn-success py-1 px-3" onclick="updateElement(${i})">Update</button></th>
                    <th><button class="btn btn-danger py-1 px-3" onclick="deleteElement(${i})">Delete</button></th>
                </tr>`;
            no++;
        }

    }
    document.querySelector("#tbody").innerHTML = box;
}

// fucntion to check if website's name exist or not
function isFound() {
    var isFound=true;
    for (var i = 0; i < allSites.length; i++) {
        if (sn.value.toLowerCase()==allSites[i].name.toLowerCase()){
            isFound = false;
        }
        
        
    }
    return isFound;
}