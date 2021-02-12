$(document).ready(function () {
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8080/api/hojasDeCobro',
                    success: function (data) {
                        var tr = [];
                        
                        
                         for (var i = 0; i < data.length; i++) {
                         	tr.push('<tr>');
                         	tr.push('<td>' + i + '</td>');
                            tr.push('<td>' + data[i].idHojaDeCobro + '</td>');
                            tr.push('<td>' + data[i].fkCiUsuario + '</td>');
                            tr.push('<td>' + data[i].cantidadApagar + '</td>');
                            tr.push('<td>' + data[i].sector + '</td>');
                            tr.push('<td>' + data[i].tipoDePago + '</td>');
							tr.push('<td>' + data[i].fechaTransaccion + '</td>');
							tr.push('<td> <a href="#" onclick="aprobar(1)">aprobar</a></td>');
                            tr.push('<td>');
							tr.push('<a data-toggle="modal" data-target="#modalwarning'+data[i].idHojaDeCobro+'" class="btn btn-primary"><img width="20px" src="img/eliminar.png"></a>');
							tr.push('<div class="modal modal-warning fade in" id="modalwarning'+data[i].idHojaDeCobro+'">');
							tr.push(' <div class="modal-dialog">');
							tr.push('	<div class="modal-content">');
							tr.push('		<div class="modal-header">');
							tr.push('			<h5 class="modal-title text-dark">¿Cancelar esta solicitud?</h5>');
							tr.push('			<button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">');
							tr.push('			<span aria-hidden="true">&times;</span></button>');
							tr.push('		</div>');
							tr.push('		<div class="modal-body">');
							tr.push('			<h3 class="text-dark">'+data[i].fkCiUsuario+'</h3>');
							tr.push('		</div>');
							tr.push('		<div class="modal-footer">');
							tr.push('			<button type="button" class="btn btn-outline pull-left" data-dismiss="modal">No</button>');
							tr.push('			<a type="button" class="btn btn-outline borrar" href="#" id='+data[i].idHojaDeCobro+'><i class="fa fa-check"></i>&nbsp;Si</a>');
							tr.push('		</div>');
							tr.push('	</div>');
							tr.push(' </div>');
							tr.push('</div>	');
							tr.push('</td>');
                            tr.push('</tr>');
                        }
                        
                         $('#listadoHojaDeCobro').append($(tr.join('')));
                    },  
                 });
                 $(document).delegate('.borrar', 'click', function () {
                    var id = $(this).attr('id');
                    var parent = $(this).parent().parent();
                    $.ajax({
                        type: "DELETE",
                        url: "http://localhost:8080/api/hojasDeCobro/delete/" + id,
                        cache: false,
                        success: function () {
                            parent.fadeOut('slow', function () {
                                $(this).remove();
                            });
                            location.reload(true)
                        }
                    });
                }); 
});
