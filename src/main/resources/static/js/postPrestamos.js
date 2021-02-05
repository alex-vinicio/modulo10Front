const $formPrestamo = document.getElementById('formPrestamos');

$(document).ready(function() {
	$(document).delegate('#enviarPrestamo', 'click', function(event) {
		event.preventDefault()
		
		var cedulaEmpleado = $formPrestamo.elements.cedulaP.value;
		var fechaActual = new Date();
		var montoP = $formPrestamo.elements.montoP.value;
		var estadoPrestamo = false;
		var idP = cedulaEmpleado+fechaActual.getHours()+fechaActual.getMinutes()+fechaActual.getSeconds();
		var situacionP = "pendiente";
		var mesPago = parseInt($formPrestamo.elements.mesPagoP.value);
		var fechaTransaccion = fechaActual.getDate() + "/" + (fechaActual.getMonth() +(1)) + "/" + fechaActual.getFullYear();
		//asignando id segun la cedula y el tiempo enviado, con segundos
		var fechaFinPago = fechaActual.getDate() + "/" + (fechaActual.getMonth() +(mesPago+1)) + "/" + fechaActual.getFullYear();
		
		//creacion del formdata para flushear los datos al back
		var formData = new FormData();
		var objArr = [];
		//creacion del JSon mediante una cadena
		objArr.push({"idPrestamosEmpleados": idP,
	    "fechaInicioPrestamo": fechaTransaccion,
	    "fechaFinPrestamo": fechaFinPago,
	    "montoPrestamo": montoP,
	    "estadoPrestamo": estadoPrestamo,
	    "fkEmpleadoPrestamo": cedulaEmpleado,
	    "mesesPago": mesPago,
	    "situacionPrestamo": situacionP,
	    "fkCiEmpleadoAdmin": ""});
	
		formData.append('prestamos', JSON.stringify( objArr ));
		
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/api/prestamo/solicitarPrestamo",
			data: formData,
			cache: false,
			processData:false,
			contentType:false,
			success: function (result) {
				alertify.alert('Solicitud de prestamo guardado !')
				
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