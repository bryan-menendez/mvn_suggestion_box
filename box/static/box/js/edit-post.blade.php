<div class="modal fade" id="modalPostEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <form id="formPostEdit" enctype="multipart/form-data">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Editar publicacion</h5>
                    <button type="button" class="close float-right" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="postEditId" name="postEditId">
                    @csrf
                    @method('PUT')
                    <div>
                        <label for="imagen">Subir imagen</label> <br>
                        <input type="file" name="imagen" class="image" id="boxPostEditImagen"/> <br>
                        
                        <label for="titulo">Titulo</label>
                        <input type="text" value="" class="form-control" name="titulo" id="boxPostEditTitulo" required
                            autocomplete="title" autofocus>
                        <label for="contenido">Contenido</label>
                        <textarea type="text" class="form-control" name="contenido" id="boxPostEditContenido" required
                            autocomplete="content" style="height: 20vh;" autofocus></textarea>
                    </div>
            
                    <ul class="errorMsg mt-3"></ul>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                    <button id="btnPostEdit" type="submit" class="btn btn-primary">Editar</button>
                </div>
            </form>
        </div>
    </div>
</div>
