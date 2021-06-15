<div class="table">
    @if (count($comentarios) > 0)
        @foreach ($comentarios->sortByDesc('created_at') as $comentario)
            <div class="card my-5">
                <div class="card-header">                    
                    <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/profile-1506810-1278719.png" class="rounded-circle mr-3" height="50px" width="50px" alt="avatar">
                    <a class="card-title d-inline"
                        style="color:#2E7FB0; font-size: 1.2em">{{ $comentario->user->name }}</a>
                    @if (Auth::user() == $comentario->user || Auth::user()->tipo == "Administrador")
                        <button data-id="{{$comentario->id}}" class="btn btn-light btn-sm btnModalCmtEdit" data-dismiss="modal" data-toggle="modal" data-target="#modalCmtEdit"><i class="far fa-edit"></i></button>
                        <button data-id="{{$comentario->id}}" class="btn btn-light btn-sm btnModalCmtDelete" data-dismiss="modal" data-toggle="modal" data-target="#modalCmtDelete"><i class="far fa-trash-alt"></i></button> 
                    @endif
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <p class="card-text" style="font-size: 0.8em">{!! nl2br(e($comentario->comment)) !!}</p>
                        <footer class="blockquote-footer" style="color:silver">{{ $comentario->created_at }}
                            <div class="float-right">
                                <label id="mostrarLike{{ $comentario->id }}" style="color:grey;">{{ $comentario->likes }}</label>
                                <button data-id="1" type="button" data-cmt="{{ $comentario }}" class="btnToggleCmtLike btn btn-outline-light btn-sm"><i class="far fa-smile" style="color:green"></i></button>
                                
                                <label id="mostrarDisLike{{ $comentario->id }}" style="color:grey;">{{ $comentario->dislikes }}</label>
                                <button data-id="0" type="button" data-cmt="{{ $comentario }}" class="btnToggleCmtLike btn btn-outline-light btn-sm"><i class="far fa-angry" style="color:red"></i></button>
                            </div>
                        </footer>
                    </blockquote>
                </div>
            </div>
        @endforeach
    @else
        <p class="alert alert-warning" align="center">No hay comentarios por aquí</p>
    @endif
</div>