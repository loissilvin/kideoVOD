// Window.onload = function () {

// }

$(document).ready(function(event) {


    //   REDIRECTION DES BOUTONS PAGE ACCEUIL AU FORMULAIRE======================================================
    let goRegister = $("#one");
    $("#one").click(function(e) {
        window.location.href = "register.html?form=0";
    })

    let goConnexion = $("#two");
    $("#two").click(function(e) {
        window.location.href = "register.html?form=1";

    })






    // REDIRECTION DU BOUTON SE CONNECTER AU FORMULAIRE CONNEXION==================================================
    let searchParams = new URLSearchParams(window.location.search)
    let param = searchParams.get('form')
    const registerForm = document.getElementById("forms");
    const connectionForm = document.getElementById("conect");
    if (param == 1) {
        registerForm.style.display = "none";
        connectionForm.style.display = "flex";
    }





    // CHANGEMENT DE FORMULAIRE==============================================================================
    const buttons = document.getElementsByClassName("change");


    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function(e) {
            if (e.target.getAttribute("data-form") == 0) {
                registerForm.style.display = "none";
                connectionForm.style.display = "flex";
            } else {
                connectionForm.style.display = "none";
                registerForm.style.display = "flex";
            }

        });
    };

    // RECUPERATION DES INFOS UTILISATEURS==============================================
    $('#submitButton').click(function(e) {
        let username = $(".usernameInput").val();
        let email = $(".emailInput").val();
        let password = $(".passwordInput").val();

        console.log(username, email, password);

        let user = new User(username, email, password);
        localStorage.setItem("user", JSON.stringify(user));


        $.post("https://brianboudrioux.fr/simplon/api/users", {
            username: username,
            email: email,
            password: password
        }, function(data, status) {
            console.log(status, data);
            if (typeof data.errors == "undefined")
                window.location.href = "index.html"
            else
                console.log(data.errors)

        });
    })



    $('#submitButtonConnexion').click(function(e) {
        // let username = $("#usernameInput").val();
        let email = $(".emailInputCo").val();
        let password = $(".passwordInputCo").val();

        // console.log(username, email, password); 
        // let user = new User(email, password);
        // user = localStorage.getItem("user");
        // user = JSON.parse(user);
        // $(".emailInputCo").val(user.email);

        $.post("https://brianboudrioux.fr/simplon/api/connect", {
            // username: username,
            email: email,
            password: password
        }, function(data, status) {

            e.preventDefault();
            console.log(status, data);
            if (data.auth == true)
                window.location.href = "pagepresentation.html"
            else
                console.log(data)

        });
    })



    //   APEL API POUR CATEGORY=====================================================================

    $(".retour").click(function(e) {
        $("#pagePresentation").hide();
        $("#displayCategory").show();
    })
    let urlCategory = "https://brianboudrioux.fr/simplon/api/categories";
    $.get(urlCategory, function(data, status) {
        console.log(data);

        $.each(data, function(i, item) {
            if (item.name == "kids" || item.name == "comedy") {
                let article = $("<article>").attr("data-id", item._id);

                let title = $("<h2>").text(item.name);
                title.appendTo(article);

                let image = $("<img>").attr("src", item.picture);
                image.appendTo(article);

                article.appendTo($("#displayCategory"));

            }

        })

    })





})