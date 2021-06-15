var listCmt = function(){
    let idPost = document.getElementById('post_id').value;
    $.ajax({
        type: 'get',
        url: routeForoPostCmtList + "/" + idPost,
        success: function(data){
            $('#cmtList').empty().html(data);
        }
    });
}

// AJAX Insertar comentario
$('#btnCmtAdd').click(function(event){
    event.preventDefault();
    $('#btnCmtAdd').prop('disabled', true);
    $('#addCmt').find(".errorMsg").html("");

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
                $("#boxComment").val("");
                listCmt();
            }
        }
    }).catch(err => {
        $('#addCmt').find(".errorMsg").html(listErrors(err));
    }).always(function(){
        $('#btnCmtAdd').prop('disabled', false);
    });
});

//TOGGLE COMMENT LIKES
$('#cmtList').on('click', '.btnToggleCmtLike', function () {
    const cmt = $(this).data('cmt');
    const isLike = $(this).data("id");
    $.ajax({
        type: 'GET',
        url: routeForoCmtLike,
        data: {
            idCmt: cmt.id, isLike: isLike
        },
        success: function(response) {
            if(response.cmt)
            {
                var likes = response.cmt.likes;
                var disLikes = response.cmt.dislikes;
                $('#mostrarLike' + response.cmt.id).text(likes); 
                $('#mostrarDisLike' + response.cmt.id).text(disLikes);              
            }
            else
            {
                $('.modalUserFail').modal('show');
                $('#userFail').text(response.msg);
            }
        }
    });
});

//LOAD MODAL EDIT
$('#cmtList').on('click', '.btnModalCmtEdit', function () {
    const id = $(this).data("id");
    $('#cmtEditId').val(id);
    $('#modalCmtEdit').find(".errorMsg").html("");

    $.ajax({
        type:"get",
        url: routeForoCmtDetails,
        data:{id:id}
    }).done(function(cmt){
        $('#boxCmt').val(cmt.comment);
    }).catch(err => {
        $('#modalCmtEdit').find(".errorMsg").html(listErrors(err));
    });
});

//SEND DATA EDIT
$('#btnCmtEdit').click(function(event){
    event.preventDefault();
    $('#modalCmtEdit').find(".errorMsg").html("");

    var token = $("input[name=_token]").val();
    var form = $('#formCmtEdit');
    var route = routeForoCmtEdit;
    $.ajax({
        type: "PUT",
        headers: {"X-CSRF-TOKEN":token},
        url: route,
        data: form.serialize(),
        dataType: "json",
        success: function (data) {
            listCmt();
            $('#modalCmtEdit').modal('hide');
        }
    }).catch(err => {
        $('#modalCmtEdit').find(".errorMsg").html(listErrors(err));
    });
});

//LOAD MODAL DELETE
$('#cmtList').on('click', '.btnModalCmtDelete', function () {
    const id = $(this).data("id");
    $('#cmtDeleteId').val(id);
});

//send data delete
$("#btnCmtDelete").click(function(){
    var id = $('#cmtDeleteId').val();
    var token = $("input[name='_token']").val();
    var route = routeForoCmtDelete;

    $.ajax(
    {
      url: route+"/"+id,
      type: 'DELETE',
      dataType: "JSON",
      data: {"id": id, "_method": 'DELETE', "_token": token,},
      success: function (data)
      {
          $('#modalCmtDelete').modal('hide');
          listCmt();
      }
    });
});


