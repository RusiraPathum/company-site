$(document).ready(function() {

    $("#alertSuccess").hide();
    $("#alertError").hide();
    $("#loading").hide();

});

$("#submit").click(function (){

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone_number = document.getElementById('phone_number').value;
    let category = document.getElementById('category').value;

    var status = validateItemForm();
    if (status != true) {
        $("#alertError").text(status);
        $("#alertError").show();
        return;
    }

    let id = "contact";

    let dt = {
        id:id,
        name:name,
        email:email,
        phone_number:phone_number,
        category:category
    };

    $.ajax({
        url: 'data.php',
        type: 'POST',
        data: dt,
        beforeSend: function(){
            $("#loading").show();
            $("#submit").attr("disabled", "disabled");
        },
        success:function (res){

            if (res == 1){
                $("#alertError").hide();
                $("#alertSuccess").text("Your Inquiry added");
                $("#alertSuccess").fadeTo(2000, 500).slideUp(500, function() {
                    $("#alertSuccess").slideUp(500);
                });

                $("#loading").hide();

                document.getElementById('name').value = "";
                document.getElementById('email').value = "";
                document.getElementById('phone_number').value = "";
                document.getElementById('category').value = "";

            }
        }
    })

})

function validateItemForm() {

    if ($("#name").val().trim() == "") {
        return "Enter Name.";
    }

    if ($("#email").val().trim() == "") {
        return "Enter Email.";
    }

    if ($("#phone_number").val().trim() == "") {
        return "Enter Phone number.";
    }
    return true;
}