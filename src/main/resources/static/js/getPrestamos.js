 $(document).ready(function () {
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8080/api/prestamos',
                    success: function (data) {
                        var tr = [];
                        
                        
                         for (var i = 0; i < data.length; i++) {
                         	tr.push('<tr>');
                         	tr.push('<td>' + i + '</td>');
                            tr.push('<td>' + data[i].idPrestamosEmpleados + '</td>');
                            tr.push('<td>' + data[i].fkEmpleadoPrestamo + '</td>');
                            tr.push('<td>' + data[i].fechaInicioPrestamo + '</td>');
                            tr.push('<td>' + data[i].estadoPrestamo + '</td>');
                            tr.push('<td>' + data[i].montoPrestamo + '</td>');
							tr.push('<td>' + data[i].mesesPago + '</td>');
							tr.push('<td>' + data[i].situacionPrestamo + '</td>');
							tr.push('<td> <a href="#" onclick="aprobar(1)">aprobar</a></td>');
							tr.push('<td> <a href="#">cancelar</a></td>');
                            tr.push('</tr>');
                        }
                        
                         $('#listadoPrestamo').append($(tr.join('')));
                    },  
                 });
                 /* $(document).delegate('.borrar', 'click', function () {
                    var id = $(this).attr('id');
                    var parent = $(this).parent().parent();
                    $.ajax({
                        type: "DELETE",
                        url: "http://localhost:8080/api/prestamos/" + id,
                        cache: false,
                        success: function () {
                            parent.fadeOut('slow', function () {
                                $(this).remove();
                            });
                            location.reload(true)
                        }
                    });
                }); */
});
function aprobar(){
	console.log("aceptar")
}