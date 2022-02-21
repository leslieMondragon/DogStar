function validate() {
    holder = $("#cardholder").val();
    card = $("#cardnumber").val();
    date = $("#date").val();
    cvv = $("#cvv").val();

    let datereg = /^[0-9]+[0-9]+[/]+[0-9]+[0-9]+$/;
    $(".error").remove();

    if (holder == "" || !isNaN(holder)) {
        $("#cardholder").focus().after("<span class='error'>Ingrese un nombre válido</span>");
        return false;

    } else if (card == "" || isNaN(card) || card.length < 16 || card.length > 20) {
        $("#cardnumber").focus().after("<span class='error'>Ingrese un numero válido</span>");
        return false;

    } else if (date == "" || !datereg.test(date)) {
        $("#date").focus().after("<span class='error'>Fecha inválida</span>");
        return false;

    } else if (cvv == "" || isNaN(cvv) || cvv.length != 3) {
        $("#cvv").focus().after("<span class='error'>Ingrese un dato válido</span>");
        return false;

    } else if (!document.querySelector('input[name="payCard"]:checked')) {
        $(".form-check").after("<span class='error'>Seleccione una opción.</span>");
        return false;
    } else {
        pay();
    }
}


function pay() {
    $("#wrapper").delay(200).fadeOut(2000);
    $(".footerPay").delay(200).fadeOut(2000);
    $('#load').delay(3000).fadeIn(6000);
}



document.getElementById("next").addEventListener("click", validate);