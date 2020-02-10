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

    let goEssayer = $("#three");
    $("#three").click(function(e) {
        window.location.href = "register.html?form=0";
    })
    let goCoMobile = $("#four");
    $("#four").click(function(e) {
        window.location.href = "register.html?form=1";
    })

    let goPagePresentation = $(".listingimg");
    $(".listingimg").click(function(e) {
        window.location.href = "pagepresentation.html";
    })

    $("#filmCtgr").click(function() {
        $("main.listingMain section#listingFilm div.listingimg").show();
        $("main.listingMain section#listingSerie div.listingimg").hide();
        $("main.listingMain section#listingDocu div.listingimg").hide();
    })

    $("#serieCtgr").click(function() {
        $("main.listingMain section#listingSerie div.listingimg").show();
        $("main.listingMain section#listingFilm div.listingimg").hide();
        $("main.listingMain section#listingDocu div.listingimg").hide();
    })

    $("#docuCtgr").click(function() {
        $("main.listingMain section#listingDocu div.listingimg").show();
        $("main.listingMain section#listingFilm div.listingimg").hide();
        $("main.listingMain section#listingSerie div.listingimg").hide();
    })


    // $(".listingimg").click(function() {
    //     $.get("https://brianboudrioux.fr/simplon/api/products/5dbf0500cbd3166665f3a463", function(data, status) {
    //         console.log(data.picture);
    //         $(".containerImg").attr("src", data.media);
    //         window.location.href = "pagepresentation.html"
    //     });
    // })








    // REDIRECTION DU BOUTON SE CONNECTER AU FORMULAIRE CONNEXION==================================================
    let searchParams = new URLSearchParams(window.location.search)
    let param = searchParams.get('form')
    const registerForm = document.getElementById("forms");
    const connectionForm = document.getElementById("conect");
    if (param == 1) {
        registerForm.style.display = "none";
        connectionForm.style.display = "flex";
    }

    // $(".listingimg").on("click", ".media", function() {
    //     let src = $(this).data("media");
    //     $("iframe").attr("href", "pagepresentation.html?id=" + src);
    //     // window.location.href = "pagepresentation.html";
    // })

    //On récupére dans l'url le lien et on l'injecte dans l'Iframe
    // const params = new URL(document.location).searchParams;
    // const lien = params.get("id");
    // $("iframe").attr("src", lien);

    var params = new window.URLSearchParams(window.location.search);
    var lien = params.get("id")
    $("iframe").attr("src", lien)




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
            e.preventDefault();
            console.log(status, data);
            if (typeof data.errors == "undefined") {
                window.location.href = "listing.html";
            } else {
                e.preventDefault();
                console.log(data.errors)
            }
        });
    })

    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    $(".emailInputCo").val(user.email);


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
            if (data.auth == true) {
                window.location.href = "listing.html"
            } else {
                e.preventDefault();
                alert("ERROR FATLE");
            }
        });
    })

    $(".play-btn").click(function() {
        $(this).css("display", "none");
        //$("iframe").contents().find(".ytp-large-play-button .ytp-button").trigger("click");
        //console.log($("iframe").contents().find("#player"))
        console.log($("iframe"))
        $("iframe").attr("src", $("iframe").attr("src") + '?autoplay=1&mute=1')
    })




    const bla = document.getElementById('ouino')
    console.log($('#ouino'))
    //   APEL API =====================================================================

        let urlFilm = "https://brianboudrioux.fr/simplon/api/products/category/5dbeff05cbd3166665f3a45a";
            $.get(urlFilm, function(data, status) {
        console.log(data);
                $.each(data, function(i, item) {
                    if (i === 4) {
                        return false
                    }
            let article = $("<div class='listingimg'>").attr("data-id", item._id);
            let image = $("<img id='img1'>").attr({ "src": item.picture, "alt": item.media });
            image.appendTo(article);
            article.appendTo($("#listingFilm"));
            $(image).click(function() {
                let src = $(this).attr("alt");
                // $("#iframe").attr("src", src);
                // var att = $("#iframe").attr("src")
                window.location.href = "pagepresentation.html?id=" + src;
                $("div.synopsis p#ouino").text(item.name)

            })


        })

        let urlSerie = "https://brianboudrioux.fr/simplon/api/products/category/5dbf0c166cb3406eba1ac780";
        $.get(urlSerie, function(data, status) {
            console.log(data);
            $.each(data, function(i, item) {
                if (i === 4) {
                    return false
                }
                let article = $("<div class='listingimg'>").attr("data-id", item._id);
                let image = $("<img id='img1'>").attr({ "src": item.picture, "alt": item.media });
                image.appendTo(article);
                article.appendTo($("#listingSerie"));
                $(image).click(function() {
                    let lien = $(this).attr("alt")
                    window.location.href = "pagepresentation.html";
                })
            })
        });

        let urlDocu = "https://brianboudrioux.fr/simplon/api/products/category/5dbf0adc6cb3406eba1ac77d";
        $.get(urlDocu, function(data, status) {
            console.log(data);
            $.each(data, function(i, item) {
                if (i === 4) {
                    return false
                }
                let article = $("<div class='listingimg'>").attr("data-id", item._id);
                let image = $("<img id='img1'>").attr({ "src": item.picture, "alt": item.media });
                image.appendTo(article);
                article.appendTo($("#listingDocu"));
                $(image).click(function() {
                    let lien = $(this).attr("alt")
                    window.location.href = "pagepresentation.html";
                })
            })
        })


    })






    // fin
})