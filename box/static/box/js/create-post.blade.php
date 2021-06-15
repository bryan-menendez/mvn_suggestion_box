<div class="modal fade" id="modalPostAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <form id="formPostAdd" enctype="multipart/form-data">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Crear publicacion</h5>
                    <button align="right" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                    @csrf
                    <input type="hidden" value="{{ $categoria->id }}" name="categoria_id">
                    <div>
                        <label for="imagen">Subir imagen</label> <br>
                        <input type="file" name="imagen" class="image" id="boxPostAddImagen"/> <br>
                        
                        <label for="titulo">Titulo</label>
                        <input type="text" value="" class="form-control" name="titulo" id="boxPostAddTitulo" required
                            autocomplete="title">
                        <label for="contenido">Contenido</label>
                        <textarea type="text" class="form-control" name="contenido" id="boxPostAddContenido" required
                            autocomplete="content" style="height: 20vh;"></textarea>
                    </div>

                    <ul class="errorMsg mt-3"></ul>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn green white-text text-4" id="btnPostAdd">Publicar</button>
                </div>
            </form>
        </div>
    </div>
</div>
