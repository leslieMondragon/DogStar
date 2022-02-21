class Group {
    constructor(grp, professor, days) {
        this.grp = grp;
        this.professor = professor
        this.days = days;
    }
}

let groupBasic = new Group("12-B", "Eduardo Castañeda", "Lunes y Jueves");
let groupAdvanced = new Group("38-A", "Laura Pasillas", "Martes y Viernes");

// **********

let basicGroup = [];
if (localStorage.getItem("Stored") != null) {
    basicGroup = JSON.parse(localStorage.getItem("Stored"));
}

let advancedGroup = [];
if (localStorage.getItem("advancedStored") != null) {
    advancedGroup = JSON.parse(localStorage.getItem("advancedStored"));
}

// **********

function validate() {
    dog = $("#name").val();
    age = $("#age").val();
    owner = $("#owner").val();
    mail = $("#mail").val();
    phone = $("#phone").val();

    let emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    $(".error").remove();

    if (dog == "" || !isNaN(dog)) {
        $("#name").focus().after("<span class='error'>Ingrese un nombre válido</span>");
        return false;

    } else if (age == "" || isNaN(age) || age > 19 || age < 0) {
        $("#age").focus().after("<span class='error'>Ingrese un numero valido</span>");
        return false;

    } else if (owner == "" || !isNaN(owner)) {
        $("#owner").focus().after("<span class='error'>Ingrese un nombre válido</span>");
        return false;

    } else if (mail == "" || !emailreg.test(mail)) {
        $("#mail").focus().after("<span class='error'>Ingrese un email correcto</span>");
        return false;

    } else if (phone == "" || isNaN(phone) || phone.length != 10) {
        $("#phone").focus().after("<span class='error'>Ingrese un telefono valido</span>");
        return false;

    } else if (!document.querySelector('input[name="level"]:checked')) {
        $("#radio").after("<span class='error'>Seleccione una opción.</span>");
        return false;

    } else {
        catchData();
        grpClasif();
    }
}


// **********

function catchData() {
    dogInfo = [];
    dogInfo.push($("#name").val());
    dogInfo.push($("#age").val());
    dogInfo.push($("#owner").val());
    dogInfo.push($("#mail").val());
    dogInfo.push($("#phone").val());
}

// **********

function grpClasif() {
    if (document.querySelector('#basic').checked) {

        basicGroup.push(dogInfo);

        arrayjson = JSON.stringify(basicGroup);
        localStorage.setItem("Stored", arrayjson);

        fields = JSON.parse(localStorage.getItem("Stored"));
        $(".trow").remove();

        for (i = 0; i < fields.length; i++) {
            $("#basicGrp").append("<tr class='trow'>   <td>" + fields[i][0] + "</<td> <td>" + fields[i][1] + "</<td>  <td>" + fields[i][2] + "</<td></tr>");

        }
        showRegisterTable();
        $("#registerTableB").delay(6520).fadeIn("slow");

    } else if (document.querySelector('#advanced').checked) {

        advancedGroup.push(dogInfo);

        arrayjson = JSON.stringify(advancedGroup);
        localStorage.setItem("advancedStored", arrayjson);

        fields = JSON.parse(localStorage.getItem("advancedStored"));
        $(".trow").remove();

        for (i = 0; i < fields.length; i++) {

            $("#advGrp").append("<tr class='trow'>   <td>" + fields[i][0] + "</<td> <td>" + fields[i][1] + "</<td>  <td>" + fields[i][2] + "</<td></tr>");

        }
        showRegisterTable();
        $("#registerTableA").delay(6520).fadeIn("slow");
    }
}


// **********


$("#msg").append("<div id='sucess'> <h3>Registrado exitosamente! </h3> <p>Por favor, mantente al pendiente de tu mail, <br> pronto enviaremos información importante. <p><br><a href='#watch' class='btn btn-default'>Ver Registro</a><br><a href='trainingService.html' class='btn btn-default'>Nuevo Registro</a></div>");

// **********

function showRegisterTable() {
    $("#fadeOut").delay(200).fadeOut(2000);
    $('#waitLogo').delay(2000).fadeIn(2500).fadeOut(2000);
    $('#sucess').delay(6000).fadeIn(8000);
}

// **********
function dropForm() {
    $("#name").val('');
    $("#age").val('');
    $("#owner").val('');
    $("#mail").val('');
    $("#phone").val('');
    $('.notice').text('Formulario Vacío');
}






document.getElementById("send").addEventListener("click", validate);
document.getElementById("clear").addEventListener("click", dropForm);