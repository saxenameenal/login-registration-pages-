function login(){
    var username = document.getElementById("username_input").value;
    var password = document.getElementById("password_input").value;

    $.post("/login", {
        json_string: JSON.stringify({username:username,password:password})
    }).done(function(res) {
        if(res.message == '1') {
            window.location.href = "/managerTaskboard.html";
        } else if (res.message == '0') {
             window.location.href = "/employeeTaskboard.html";
        }

    })
    .fail(function() {
     alert( "Log-in Error, please try again." );
    });
    return false;

    // $.post("test.php", { json_string:JSON.stringify({name:"John", time:"2pm"}) });
}