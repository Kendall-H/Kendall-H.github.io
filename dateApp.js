
var URLString = "https://murmuring-atoll-12351.herokuapp.com"

function loadAll() {
    fetch(URLString + "/dates", {
        method: "GET",
        credentials: "include",
        }).then(function(response) {
            if (response.status == 200) {
                getDates();
            } else {
                dataDiv();
            }
        });
    };

loadAll()

function dataDiv() {
    document.getElementById("dataField").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
};

var loginButton = document.querySelector("#loginButton");
loginButton.onclick = function () {
    var loginEmail = document.querySelector("#loginEmail").value;
    var loginPassword = document.querySelector("#loginPassword").value;

    var bodyStr = "email=" + encodeURIComponent(loginEmail);
    bodyStr += "&" + "password=" + encodeURIComponent(loginPassword);

    fetch(URLString + "/sessions" , {
        method: "POST",
        credentials: "include",
        body: bodyStr,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }).then(function(response) {
        console.log("Server Responded")
        if (response.status == 201) {
            document.getElementById("registerForm").style.display = "none";
            document.getElementById("loginForm").style.display = "none";
            document.getElementById("dataField").style.display = "block";
            getDates();
        } else {
            document.querySelector("#loginStatus").textContent = "Incorrect email or password";
        }
    }
    )
}

var registerButton = document.querySelector("#register");
registerButton.onclick = function () {
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
};

var addNewUserButton = document.querySelector("#registerSubmit");
addNewUserButton.onclick = function () {

    var firstName = document.querySelector("#firstName").value;
    var lastName = document.querySelector("#lastName").value;
    var registerEmail = document.querySelector("#registerEmail").value;
    var registerPassword = document.querySelector("#registerPassword").value;

    var bodyStr = "firstname=" + encodeURIComponent(firstName);
    bodyStr += "&" + "lastname=" + encodeURIComponent(lastName);
    bodyStr += "&" + "email=" + encodeURIComponent(registerEmail);
    bodyStr += "&" + "password=" + encodeURIComponent(registerPassword);
    console.log(bodyStr)

    fetch(URLString + "/users", {
        method: "POST",
        credentials: "include",
        body: bodyStr,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }).then(function(response) {
        console.log("Server Responded")
        if (response.status == 201) {
            document.querySelector("#registerStatus").textContent = "User created";
            document.getElementById("loginForm").style.display = "block";
            document.getElementById("registerForm").style.display = "none";
            document.querySelector("#loginStatus").textContent = "User created!"
        } else {
            document.querySelector("#registerStatus").textContent = "User already exists";
        }
    }
    )
}

var getDates = function () {
    fetch(URLString + "/dates", {
        method: "GET",
        credentials: "include",
    }).then(function(response) {
        response.json().then(function (data) {
            console.log("data received from server:", data);

            document.getElementById("loginForm").style.display = "none";
            document.getElementById("registerForm").style.display = "none";

            var dateList = document.querySelector("#listOfDates");
            data.forEach(function (date) {

                var newListItem = document.createElement("li");

                var titleHeading = document.createElement("h3");
                titleHeading.innerHTML = "Name: " + date.name;
                newListItem.appendChild(titleHeading);

                var lengthDiv = document.createElement("div");
                lengthDiv.innerHTML = "Length: " + date.length;
                newListItem.appendChild(lengthDiv);

                var costDiv = document.createElement("div");
                costDiv.innerHTML = "Cost: " + "$" + date.cost;
                newListItem.appendChild(costDiv);
                
                var seasonDiv = document.createElement("div");
                seasonDiv.innerHTML = "Season: " + date.season;
                newListItem.appendChild(seasonDiv);

                var fun_factorDiv = document.createElement("div");
                fun_factorDiv.innerHTML = "Fun_Factor: " + date.fun_factor;
                newListItem.appendChild(fun_factorDiv);

                var deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Delete";
                deleteButton.onclick = function () {
                    console.log("delete button clicked", date.id);
                    if (confirm("Are you sure you want to delete " + date.name + "?")){
                        deleteDate(date.id);
                    }
                };
                newListItem.appendChild(deleteButton);

                var editButton = document.createElement("button");
                editButton.innerHTML = "Edit";

                editButton.onclick = function () {
                    
                    document.querySelector("#editButton").style.visibility = 'visible';
                    document.querySelector("#addButton").style.visibility = 'hidden';

                    var newHeader = document.querySelector("#formHeader");
                    newHeader.innerHTML = "Editing";

                    var newDateName = document.querySelector("#dateName");
                    newDateName.value = date.name;
                    
                    var newDateLength = document.querySelector("#lengthOfTime");
                    newDateLength.value = date.length;

                    var newDateCost = document.querySelector("#cost");
                    newDateCost.value = date.cost;

                    var newDateSeason = document.querySelector("#selectId");
                    newDateSeason.value = date.season;

                    var newDateFunFactor = document.querySelector("#funFactor");
                    newDateFunFactor.value = date.fun_factor;

                    var submitButton = document.querySelector("#editButton");

                    submitButton.onclick = function () {
                            editDate(date.id);
                    }
                }

                newListItem.appendChild(editButton);

                dateList.appendChild(newListItem);
            });
        });
    });  
};

var addButton = document.querySelector("#addButton");
addButton.onclick = function () {

    var inputName = document.getElementById("dateName").value;
    var inputLength = document.getElementById("lengthOfTime").value;
    var inputCost = document.getElementById("cost").value;
    var inputFun = document.getElementById("funFactor").value;
    var inputSeason = document.getElementById("selectId").value;

    if ((inputName.trim() == '') || (inputLength.trim() == '') || (inputCost.trim() == '') || (inputFun.trim() == '') || (inputSeason.trim() == '')) {
        var errorString = document.querySelector("#errorMessage")
        errorString.innerHTML = ("Please fill out all fields first")

    } else {
        var newDateName = document.querySelector("#dateName").value;
        var newDateLength = document.querySelector("#lengthOfTime").value;
        var newDateCost = document.querySelector("#cost").value;
        var newDateSeason = document.querySelector("#selectId").value;
        var newDateFunFactor = document.querySelector("#funFactor").value; 

        var bodyStr = "name=" + encodeURIComponent(newDateName);
        bodyStr += "&" + "length=" + encodeURIComponent(newDateLength);
        bodyStr += "&" + "cost=" + encodeURIComponent(newDateCost);
        bodyStr += "&" + "season=" + encodeURIComponent(newDateSeason);
        bodyStr += "&" + "fun_factor=" + encodeURIComponent(newDateFunFactor);
        console.log(bodyStr)

        fetch(URLString + "/dates",{
            method: "POST",
            credentials: "include",
            body: bodyStr,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) {
            console.log("Server Responded")
            var clearList = document.querySelector("#listOfDates");
            clearList.innerHTML = "";

            document.querySelector("#dateName").value = '';
            document.querySelector("#lengthOfTime").value = '';
            document.querySelector("#cost").value = '';
            document.querySelector("#selectId").value = "empty";
            document.querySelector("#funFactor").value = '1';

            getDates();
        });
    }
};

var deleteDate = function(dateId) {
    
    fetch(URLString + "/dates/" + dateId, {
        method: "DELETE",
        credentials: "include"
    }).then(function (response) {
        var clearList = document.querySelector("#listOfDates");
        clearList.innerHTML = "";
        getDates();
    })
};

var editDate = function(dateId) {

    var newDateName = document.querySelector("#dateName").value;
    var newDateLength = document.querySelector("#lengthOfTime").value;
    var newDateCost = document.querySelector("#cost").value;
    var newDateSeason = document.querySelector("#selectId").value;
    var newDateFunFactor = document.querySelector("#funFactor").value; 

    var bodyStr = "name=" + encodeURIComponent(newDateName);
    bodyStr += "&" + "length=" + encodeURIComponent(newDateLength);
    bodyStr += "&" + "cost=" + encodeURIComponent(newDateCost);
    bodyStr += "&" + "season=" + encodeURIComponent(newDateSeason);
    bodyStr += "&" + "fun_factor=" + encodeURIComponent(newDateFunFactor);

    fetch(URLString + "/dates/" + dateId, {
        method: "PUT",
        credentials: "include",
        body: bodyStr,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function (response) {
        var clearList = document.querySelector("#listOfDates");
        clearList.innerHTML = "";
        
        document.querySelector("#dateName").value = '';
        document.querySelector("#lengthOfTime").value = '';
        document.querySelector("#cost").value = '';
        document.querySelector("#selectId").value = "empty";
        document.querySelector("#funFactor").value = '1';
        document.querySelector("#addButton").style.visibility = "visible";
        document.querySelector("#editButton").style.visibility = "hidden";
        document.querySelector("#formHeader").innerHTML = "Please add a date below";

        getDates();
    })
}