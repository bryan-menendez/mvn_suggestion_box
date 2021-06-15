function loadPostDetail()
{
    var idPost = document.getElementById('post_id').value;
    $.ajax({
        type: 'get',
        url: routeForoPostViewDetail + "/" + idPost,
        success: function(data){
            $('#postDetail').empty().html(data);
        }
    });
}

//SETUP MODAL ADD
$('#btnModalPostAdd').click(function(event) {
    $('#modalPostAdd').modal('show');
    $('#btnPostAdd').prop('disabled', false);
    $('#modalPostAdd').find(".errorMsg").html("");
});

//SEND DATA ADD
$('#btnPostAdd').click(function(event) {
    event.preventDefault();
    $('#btnPostAdd').prop('disabled', true);
    $('#modalPostAdd').find(".errorMsg").html("");

    var token = $("input[name=_token]").val();
    var route = routeForoPostAdd;
    
    $.ajax({
        type: "post",
        headers: {
            "X-CSRF-TOKEN": token
        },
        url: route,
        processData: false,
        contentType: false,
        data: new FormData($("#formPostAdd")[0]),
        success: function(data) {
            if (data.success == 'true') {
                $('#modalPostAdd').modal('hide');
                $("#boxPostAddTitulo").val("");
                $("#boxPostAddContenido").val("");
                $("#boxPostAddImagen").val("");

                catPostList();
            }
        }
    }).catch(err => {
        $('#modalPostAdd').find(".errorMsg").html(listErrors(err));
    }).always(function(){
        $('#btnPostAdd').prop('disabled', false);   
    });
});

//send request EDIT
$('#btnPostEdit').click(function(event) {
    event.preventDefault();
    $('#modalPostEdit').find(".errorMsg").html("");

    const token = $("input[name=_token]").val();
    const route = routeForoPostEdit;

    $.ajax({
        type: "POST",
        headers: {"X-CSRF-TOKEN": token},
        url: route,
        processData: false,
        contentType: false,
        data: new FormData($("#formPostEdit")[0]),
        success: function(data) {
            if (typeof catPostList === "function")
                catPostList($('#page_id').attr('value'));
            else
                loadPostDetail();
            $('#modalPostEdit').modal('hide');
        }
    }).catch(err => {
        $('#modalPostEdit').find(".errorMsg").html(listErrors(err));
    });
});

//TOGGLE POST LIKE
$('#postList').on('click', '.btnTogglePostLike', function () {
    let postId = $(this).data('post');
    let isLike = $(this).data("id");

    $.ajax({
        type: 'GET',
        url: routeForoPostLike,
        data: { idPost: postId, isLike: isLike },
        success: function(response) {
            if (response.post){
                $('#lblPostLike' + response.post.id).text(response.post.likes); 
                $('#lblPostDisLike' + response.post.id).text(response.post.dislikes);              
            }else{
                $('.modalUserFail').modal('show');
                $('#userFail').text(response.msg);
            }
        }
    });
});

//TOGGLE POST FAVORITE
$('#postList').on('click', '.btnPostFavorite', function (){
    const token = $("input[name=_token]").val();
    let idPost = $(this).data('post');
    $.ajax({
        type:'POST',
        headers: {"X-CSRF-TOKEN":token},
        url: routeForoPostAddFav,
        data: { idPost : idPost, token: token },
        success: function(response)
        {
            if(response.msgfail)
            {
                $('.modalUserFail').modal('show');
                $('#userFail').text(response.msgfail);
            }
            else if(response.msgdelete)
            {
                $('#msg').text(" Añadir a favoritos");
                toastr.options={"positionClass": "toast-bottom-left"};
                toastr.warning(response.msgdelete);         
            }
            else if(response.msgsuccess)
            {
                $('#msg').text(" Borrar de favoritos");
                toastr.options={"positionClass": "toast-bottom-left"};
                toastr.info(response.msgsuccess);
            }       
        }
    });
});

//SETUP MODAL EDIT
$('#postList').on('click', '.btnModalPostEdit', function (){
    let id = $(this).data("id");
    $('#postEditId').val(id);
    $('#boxPostEditTitulo').val("");
    $('#boxPostEditContenido').val("");
    $("#boxPostEditImagen").val("");
    $('#modalPostEdit').find(".errorMsg").html("");
    
    $.ajax({
        type:"get",
        url: routeForoPostDetails,
        data:{postId:id},
        success: function (post){
            $('#boxPostEditTitulo').val(post.titulo);
            $('#boxPostEditContenido').val(post.contenido);
        }
    }).catch(err => {
        $('#modalPostEdit').find(".errorMsg").html(listErrors(err));
    });
});

//SETUP MODAL DELETE
$('#postList').on('click', '.btnModalPostDelete', function (){
    let id = $(this).data("id"); //gets the id from the button
    $('#postDeleteId').val(id); 

    $.ajax({
        type:"get",
        url: routeForoPostDetails,
        data:{postId:id},
        success: function (post){
            $('#boxPostEditTitulo').val(post.titulo);
            $('#boxPostEditContenido').val(post.contenido);
        }
    });
});
      
//send request DELETE
$("#btnPostDelete").click(function(){
    let id = $("#postDeleteId").val();
    const token = $("input[name=_token]").val();
    const route = routeForoPostDelete;
    $.ajax({
        url: route+"?id="+id,
        type: 'DELETE',
        dataType: "JSON",
        data: {"id": id, "_method": 'DELETE', "_token": token,},
        success: function (data){
            if (typeof catPostList === "function")
                catPostList();
            else
                window.location.replace(routeForoIndex); //redirect to index

            $('.modalBorrarPost').modal('hide');
        }
    });
});