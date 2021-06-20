const csrftoken = getCookie('csrftoken');

// NEW SUGGESTION
$('.formSugAdd').on('click', '.btnSugAdd', function (event) {
    event.preventDefault();

    let cat_id = $(this).data("id");
    let sug_block = $('#addSugCat' + cat_id) //current sug box submit block

    sug_block.find('.btnSugAdd').prop('disabled', true);
    sug_block.find(".errorMsg").html("");

    var form = sug_block.find('.formSugAdd');

    fetch('/sug/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
        data: form.serialize(),
    })
    .then(response => {
        //console.log("response from adding new suggestion");
        //console.log(response);

        if (!response.ok){
            //console.log("THERE WAS AN AERRORR")
            let err = () => { listErrors(response)};
            console.log(err)
            sug_block.find(".errors").html(err);
            sug_block.find(".errors").innerHTML = err
        }
        else{
            sug_block.find("#boxSugTitle").val("");
            sug_block.find("#boxSugDesc").val("");
            listSug(cat_id);
        }

        return response;
    })
    .then(response => {
        sug_block.find('.btnSugAdd').prop('disabled', false);
    });
});

function listSug(id){

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

listErrors = async (resp) => {
    let html = '';
    let errors = {};

    if (resp.status == "413")
        html += "<li>" + "El tamaño del archivo es demasiado grande" + "</li>";

    //console.log("obj : ");
    await resp.json().then(json => {
        console.log(json.errors);
        errors = json.errors;

        return json
    }).then(json => {
        $.each(errors, function (k, v) {
            $.each(v, function (i, e) {
                html += "<li>" + k + ": "+ e + "</li>";
            });
        });

        return html;
    })

    // console.log("shit to return");
    // console.log(html);
    return html;
}