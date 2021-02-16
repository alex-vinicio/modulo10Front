 $(document).ready(function () {
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8080/api/prestamos',
                    success: function (data) {
                        var tr = [];
                        
                        
                         for (var i = 0; i < data.length; i++) {
                         	tr.push('<tr>');
                         	tr.push('<td>' + (i+1) + '</td>');
                            tr.push('<td>' + data[i].idPrestamosEmpleados + '</td>');
                            tr.push('<td>' + data[i].fkEmpleadoPrestamo + '</td>');
                            tr.push('<td>' + data[i].fechaInicioPrestamo + '</td>');
                            tr.push('<td>' + data[i].estadoPrestamo + '</td>');
                            tr.push('<td>' + data[i].montoPrestamo + '</td>');
							tr.push('<td>' + data[i].mesesPago + '</td>');
							tr.push('<td>' + data[i].situacionPrestamo + '</td>');
							tr.push('<td> <a href="#" onclick="aprobar(1)">aprobar</a></td>');
                            tr.push('<td>');
							tr.push('<a data-toggle="modal" data-target="#modalwarning'+data[i].idPrestamosEmpleados+'" class="btn btn-primary"><img width="20px" src="img/eliminar.png"></a>');
							tr.push('<div class="modal modal-warning fade in" id="modalwarning'+data[i].idPrestamosEmpleados+'">');
							tr.push(' <div class="modal-dialog">');
							tr.push('	<div class="modal-content">');
							tr.push('		<div class="modal-header">');
							tr.push('			<h5 class="modal-title text-dark">¿Cancelar esta solicitud?</h5>');
							tr.push('			<button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">');
							tr.push('			<span aria-hidden="true">&times;</span></button>');
							tr.push('		</div>');
							tr.push('		<div class="modal-body">');
							tr.push('			<h3 class="text-dark">'+data[i].fkEmpleadoPrestamo+'</h3>');
							tr.push('		</div>');
							tr.push('		<div class="modal-footer">');
							tr.push('			<button type="button" class="btn btn-outline pull-left" data-dismiss="modal">No</button>');
							tr.push('			<a type="button" class="btn btn-outline borrar" href="#" id='+data[i].idPrestamosEmpleados+'><i class="fa fa-check"></i>&nbsp;Si</a>');
							tr.push('		</div>');
							tr.push('	</div>');
							tr.push(' </div>');
							tr.push('</div>	');
							tr.push('</td>');
                            tr.push('</tr>');
                        }
                        
                         $('#listadoPrestamo').append($(tr.join('')));
                    },  
                 });
                 $(document).delegate('.borrar', 'click', function () {
                    var id = $(this).attr('id');
                    var parent = $(this).parent().parent();
                    $.ajax({
                        type: "DELETE",
                        url: "http://localhost:8080/api/prestamo/delete/" + id,
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
