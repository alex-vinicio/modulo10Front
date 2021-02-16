const $formEstCrHidden = document.forms.hiddenEstCr
const $divTabla = document.getElementById('listadoPrestamo');
$(document).ready(function () {
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8080/api/prestamos',
                    success: function (data) {
						data;
						generalTable(data);
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
function generalTable(data){
	$('#listadoPrestamo').innerHTML="";
							
	listPrestamos(data)
	addEventSearchCurso(data) 
}
	
function listPrestamos(data){
							var tr = [];
	                         for (var i = 0; i < data.length; i++) {
								var aux = '+data[i].idPrestamosEmpleados+';
	                         	tr.push('<tr>');
	                         	tr.push('<td>' + (i+1) + '</td>');
	                            tr.push('<td>' + data[i].idPrestamosEmpleados + '</td>');
	                            tr.push('<td>' + data[i].fkEmpleadoPrestamo + '</td>');
	                            tr.push('<td>' + data[i].fechaInicioPrestamo + '</td>');
	                            tr.push('<td>' + data[i].estadoPrestamo + '</td>');
	                            tr.push('<td>' + data[i].montoPrestamo + '</td>');
								tr.push('<td>' + data[i].mesesPago + '</td>');
								tr.push('<td>' + data[i].situacionPrestamo + '</td>');
								tr.push(`<td> <a onclick="aprobar('${data[i].idPrestamosEmpleados}')"><img width="35px" src="img/aprobar.png"></a></td>`);
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
	                        //tr.push('<td> <a href=modificarPublicacion.html?id=' + data[i].id + ' class="btn btn-primary"><img src="img/editar.png"></a></td>');
	                         $('#listadoPrestamo').append($(tr.join('')));
}
//Buscador------------------
function addEventSearchCurso(data){
	const form = document.searchNombreEmpleado
	form.nombreEmpleado.value = $formEstCrHidden.cedula.value
						
	form.addEventListener('submit', async (event)=>{
		event.preventDefault()
		const search = form.elements.nombreEmpleado.value
		$formEstCrHidden.cedula.value = search
		let lista = [];
		const listaPersonas = data;
		$divTabla.innerHTML=""
							
		if(search === ""){
			listPrestamos(listaPersonas)
		}else{
			listaPersonas.forEach((lt)=>{ 
			if(lt.fkEmpleadoPrestamo.indexOf(search) !== -1){ lista.push(lt) } }) 
				listPrestamos(lista);
		}
	 })
}
function aprobar(id){
	console.log(id);
	var aprobacion = true;
	$.ajax({
		type: "PUT",
		url: "http://localhost:8080/api/prestamo/aprobacion/"+id+"/"+aprobacion+"/"+localStorage.id,
		cache: false,
		processData:false,
		contentType:false,
		success: function() {
			console.log('cambio exitoso!');
			window.location.href = "prestamosLista.html";
		},
		error: function (xhr, exception) {
			
			console.log(xhr)
				if (xhr.status === 0)
					alert('Error : ' + xhr.status + 'Usuario ya tiene un prestamo en curso!'+exception);
				else{
					alert('Error : ' + xhr.status + ' Usuario ya tiene un prestamo en curso!');
				}
				
		}
	});
}
	