$(document).ready(function () {

    //ajax section
    // using serialize function of jQuery to get all values of form
    //var serializedData = $("#registration").serialize();

    $("#btnRegister").click(function () {


        //alert("registering...");
        // Variable to hold request
        //var request;
        // Fire off the request to process_registration_form.php
        /*         request = $.ajax({
                    url: "register.php",
                    type: "post",
                    data: serializedData
                }); */

        var unhcrNum = $("unhcrNum").val();
        var originCountry = $("originCountry").val();

        var data = "Registration is Successful, UNHCR Number: " + unhcrNum + ", Origin Country: " + originCountry;

        $.ajax({
            method: "post",
            url: "register.php?",
            data: data,
            success: function (data) {
                $("#output").html(data);
            }

        });


        /*         var _unhcrNum = $("#unhcrNum").val();
                var _country = $("#originCountry").val(); */
        //var password = $("#password").val();
        //var cpassword = $("#cpassword").val();
        /*         if (name == '' || email == '' || password == '' || cpassword == '') {
                    alert("Please fill all fields...!!!!!!");
                } else if ((password.length) < 8) {
                    alert("Password should atleast 8 character in length...!!!!!!");
                } else if (!(password).match(cpassword)) {
                    alert("Your passwords don't match. Try again?");
                } else {
                    $.post("register.php", {
                        name1: name,
                        email1: email,
                        password1: password
                    }, function (data) {
                        if (data == 'You have Successfully Registered.....') {
                            $("form")[0].reset();
                        }
                        alert(data);
                    });
                } */

        /*         $.post("register.php", {
                    unhcrNum: _unhcrNum,
                    country = _country
        
                }
        
                ); */




    });
});