const $formEstCrHidden = document.forms.hiddenEstCr
const $divTabla = document.getElementById('listadoProductosDadosDeBaja');
$(document).ready(function () {
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8080/api/productosBaja',
                    success: function (data) {
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
	$('#listadoProductosDadosDeBaja').innerHTML="";
							
	listPrestamos(data)
	addEventSearchCurso(data) 
}

function listPrestamos(data){
						var tr = [];
                        
                        if(data.length !== 0){
                         for (var i = 0; i < data.length; i++) {
                         	tr.push('<tr>');
                         	tr.push('<td>' + i + '</td>');
                            tr.push('<td>' + data[i].idProductoDadoDeBaja + '</td>');
                            tr.push('<td>' + data[i].nombreProductoDadoDeBaja + '</td>');
                            tr.push('<td>' + data[i].ciUsuario + '</td>');
                            tr.push('<td>' + data[i].fechaProductoDadoDeBaja + '</td>');
                            tr.push('<td>' + data[i].estadoP + '</td>');
							tr.push('<td>' + data[i].accion + '</td>');
							console.log(data[i].estado)
							if(data[i].estadoP === true){
								tr.push(`<td> <a href="#" onclick="aprobar('${data[i].idProductoDadoDeBaja}')">De baja</a></td>`);
							}else{
								tr.push('<td> <a >----</a></td>');}
                            tr.push('<td>');
							tr.push('<a data-toggle="modal" data-target="#modalwarning'+data[i].idProductoDadoDeBaja+'" class="btn btn-primary"><img width="20px" src="img/eliminar.png"></a>');
							tr.push('<div class="modal modal-warning fade in" id="modalwarning'+data[i].idProductoDadoDeBaja+'">');
							tr.push(' <div class="modal-dialog">');
							tr.push('	<div class="modal-content">');
							tr.push('		<div class="modal-header">');
							tr.push('			<h5 class="modal-title text-dark">¿Cancelar esta solicitud?</h5>');
							tr.push('			<button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">');
							tr.push('			<span aria-hidden="true">&times;</span></button>');
							tr.push('		</div>');
							tr.push('		<div class="modal-body">');
							tr.push('			<h3 class="text-dark">'+data[i].ciUsuario+'</h3>');
							tr.push('		</div>');
							tr.push('		<div class="modal-footer">');
							tr.push('			<button type="button" class="btn btn-outline pull-left" data-dismiss="modal">No</button>');
							tr.push('			<a type="button" class="btn btn-outline borrar" href="#" id='+data[i].idProductoDadoDeBaja+'><i class="fa fa-check"></i>&nbsp;Si</a>');
							tr.push('		</div>');
							tr.push('	</div>');
							tr.push(' </div>');
							tr.push('</div>	');
							tr.push('</td>');
                            tr.push('</tr>');
                        }
                        }else{
							tr.push('<tr>');
                         	tr.push('<td colspan="10" > No hay datos para mostrar</td>');
							tr.push('</tr>');
						}
                         $('#listadoProductosDadosDeBaja').append($(tr.join('')));
}
//Buscador------------------
function addEventSearchCurso(data){
	const form = document.searchIdProductoDadoDeBaja
	form.nombreIdProductoDadoDeBaja.value = $formEstCrHidden.nombrePDB.value
						
	form.addEventListener('submit', async (event)=>{
		event.preventDefault()
		const search = form.elements.nombreIdProductoDadoDeBaja.value
		$formEstCrHidden.nombrePDB.value = search
		let lista = [];
		const listaPersonas = data;
		$divTabla.innerHTML=""
							
		if(search === ""){
			listPrestamos(listaPersonas)
		}else{
			listaPersonas.forEach((lt)=>{ 
			if(lt.nombreProductoDadoDeBaja.indexOf(search) !== -1){ lista.push(lt) } }) 
				listPrestamos(lista);
		}
	 })
}

function aprobar(id){
	console.log(id);
	var aprobacion = true;
	$.ajax({
		type: "PUT",
		url: "http://localhost:8080/api/productoBaja/deBaja/"+id+"/"+localStorage.id,
		cache: false,
		processData:false,
		contentType:false,
		success: function() {
				alertify.alert('Producto dado de baja exitoso!')
				
				setTimeout(
					function () {
						window.location.href = "productosDadosDeBajaLista.html";
					}, 2000);
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
