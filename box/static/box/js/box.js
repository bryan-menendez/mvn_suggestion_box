const csrftoken = getCookie('csrftoken');

// NEW SUGGESTION
$('.formSugAdd').on('click', '.btnSugAdd', function (event){    
    event.preventDefault();

    let cat_id = $(this).data("id");
    $('#addSugCat' + cat_id).find('#btnSugAdd').prop('disabled', true);    
    $('#addSugCat' + cat_id).find(".errorMsg").html("");

    var form = $('#addSugCat' + cat_id).find('.formSugAdd');

    $.ajax({
        type: "POST",
        headers: {"X-CSRFToken": csrftoken},
        url: "/sug/add",
        data: form.serialize(),
        dataType: "json",
        success: function (data) 
        {
            console.log(data);
            $('#addSugCat' + cat_id).find("#boxSugTitle").val("");
            $('#addSugCat' + cat_id).find("#boxSugDesc").val("");                
            listSug(cat_id);
        }
    }).catch(err => {
        $('#formSugAdd').find(".errorMsg").html(listErrors(err));
    }).always(function(){
        $('#btnSugAdd').prop('disabled', false); 
    });
});

// AJAX Insertar comentario
$('#btnCmtAdd').click(function(event){
    event.preventDefault();
    $('#btnCmtAdd').prop('disabled', true);
    $('#formCmtAdd').find(".errorMsg").html("");

    var token = $("input[name=_token]").val();
    var form = $('#addCmt');
    var route = routeForoCmtAdd;
    $.ajax({
        type: "post",
        headers: {"X-CSRF-TOKEN":token},
        url: route,
        data: form.serialize(),
        dataType: "json",
        success: function (data) 
        {
            if(data.success == 'true')
            {
                $("#boxCmt").val("");
                listCmt();
            }
        }
    }).catch(err => {
        $('#formAddCmt').find(".errorMsg").html(listErrors(err));
    }).always(function(){
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

function listErrors(err)
{
    let html = '';
    let errors = {};

    if (err.status == "413")
        html += "<li>" + "El tamaño del archivo es demasiado grande" + "</li>";
    
    if (err.responseJSON != null)
    {    
        errors = err.responseJSON.errors;

        if (err.responseJSON.customError)
            html += "<li>" + err.responseJSON.customError + "</li>";
    }
    
    $.each(errors, function(k,v){ 
        $.each( v, function( i, e ){
            html += "<li>" + e + "</li>";
        });
    });

    return html;
}