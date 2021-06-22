const csrftoken = getCookie('csrftoken');
console.log(csrftoken);

// NEW SUGGESTION
$('.formSugAdd').on('click', '.btnSugAdd', function (event) {
    event.preventDefault();

    let cat_id = $(this).data("id");
    let sug_block = $('#addSugCat' + cat_id) //current sug box submit block

    sug_block.find('.btnSugAdd').prop('disabled', true);
    sug_block.find(".errors").html("");

    var form = sug_block.find('.formSugAdd');

    $.ajax({
        method: "POST",
        headers: {"X-CSRFToken": csrftoken},
        url: "/sug/add",
        data: form.serialize()
    }).done(function() {
        console.log("SAODHAJOSDASDAJDS");
        sug_block.find("#boxSugTitle").val("");
        sug_block.find("#boxSugDesc").val("");
        
        location.href = ("#datosCat"+cat_id)
        location.reload();
    }).catch(response => {
        let err = listErrors(response);
        sug_block.find(".errors").html(err);
        sug_block.find(".errors").innerHTML = err
    }).always(function(){
        sug_block.find('.btnSugAdd').prop('disabled', false);
    });
});

listErrors = (resp) => {
    let html = '';
    let errors = {};

    if (resp.status == "413")
        html += "<li>" + "El tamaño del archivo es demasiado grande" + "</li>";

    if (resp.responseJSON != null)
    {
        errors = resp.responseJSON.errors;

        if (resp.responseJSON.customError)
            html += "<li>" + resp.responseJSON.customError + "</li>";
    }

    $.each(errors, function (k, v) {
        $.each(v, function (i, e) {
            html += "<li>" + k + ": "+ e + "</li>";
        });
    });

    return html;
}



// AJAX Insertar comentario
$('#btnCmtAdd').click(function (event) {
    event.preventDefault();
    $('#btnCmtAdd').prop('disabled', true);
    $('#formCmtAdd').find(".errorMsg").html("");

    var token = $("input[name=_token]").val();
    var form = $('#addCmt');
    var route = routeForoCmtAdd;
    $.ajax({
        type: "post",
        headers: { "X-CSRF-TOKEN": token },
        url: route,
        data: form.serialize(),
        dataType: "json",
        success: function (data) {
            if (data.success == 'true') {
                $("#boxCmt").val("");
                listCmt();
            }
        }
    }).catch(err => {
        $('#formAddCmt').find(".errorMsg").html(listErrors(err));
    }).always(function () {
        $('#btnCmtAdd').prop('disabled', false);
    });
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

