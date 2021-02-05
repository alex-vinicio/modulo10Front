const $formHDC = document.getElementById('formPrestamos');

$(document).ready(function() {
	$(document).delegate('#enviarHDC', 'click', function(event) {
		event.preventDefault()
		
		var cedulaCliente = $formHDC.elements.cedulaCliente.value;
		var fechaActual = new Date();
		var cantidadPagoHDC = parseInt($formHDC.elements.antidadPagoHDC.value);
		var idHDC = $formHDC.elements.idHDC.value;
		var sector = $formHDC.elements.sectorHDC.value;
		var tipoPago = $formHDC.elements.tipoPago.value;
		
		//creacion del formdata para flushear los datos al back
		var formData = new FormData();
		var objArr = [];
		//creacion del JSon mediante una cadena
		objArr.push({"idHojaDeCobro": idHDC,
	    "fkCiUsuario": cedulaCliente,
	    "cantidadApagar": cantidadPagoHDC,
	    "sector": sector,
	    "tipoDePago": tipoPago,
	    "fechaTransaccion": fechaActual});
	
		formData.append('productosDadosDeBaja', JSON.stringify( objArr ));
		console.log(objArr);
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/api/hojasDeCobro/create",
			data: formData,
			cache: false,
			processData:false,
			contentType:false,
			success: function (result) {
				alertify.alert('Solicitud de Hoja de cobro guardado!')
				
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