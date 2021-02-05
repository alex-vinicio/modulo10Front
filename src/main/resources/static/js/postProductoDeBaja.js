const $form = document.getElementById('formProductosDeBaja');

$(document).ready(function() {
	$(document).delegate('#envioProductoDeBaja', 'click', function(event) {
		event.preventDefault()
		
		var cedulaEmpleado = $form.elements.cedulaBodeguero.value;
		var fechaActual = new Date();
		var nombrePDB = $form.elements.nombrePDB.value;
		var idPDB = $form.elements.idPDB.value;
		
		var formData = new FormData();
		var objArr = [];
		
		//creacion del JSon mediante una cadena
		objArr.push({"idProductoDadoDeBaja": idPDB,
	    "fkCiUsuario": cedulaEmpleado,
	    "nombreProductoDadoDeBaja": nombrePDB,
	    "fechaProductoDadoDeBaja": fechaActual});
	
		formData.append('productosDadosDeBaja', JSON.stringify( objArr ));
		
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/api/productoBaja/create",
			data: formData,
			cache: false,
			processData:false,
			contentType:false,
			success: function (result) {
				alertify.alert('Se dio de baja al producto correctamente!')
				
				setTimeout(
					function () {
						window.location.href = "index.html";
					}, 3000);
			},
			error: function (xhr, exception) {
				if (xhr.status === 0)
					alert('Error : ' + xhr.status + 'Datos incorrecto.'+exception);
				else{
					alert('Error : ' + xhr.status + ' Datos incorrecto.');
				}
				
			}
		});
		
	});
});