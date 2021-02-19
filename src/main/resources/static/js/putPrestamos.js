const $buttonCancelar = document.getElementById('cancelar');
const $formPrestamo = document.getElementById('formPrestamos');
$(document).ready(function() {
	$(document).delegate('#enviarPrestamo', 'click', function(event) {
		event.preventDefault()
		
		var cedulaEmpleado = $formPrestamo.elements.cedulaP.value;
		var fechaActual = new Date();
		var montoP = $formPrestamo.elements.montoP.value;
		var idP = $formPrestamo.elements.idP.value;
		var situacionP = $formPrestamo.elements.estadoP.value;
		var mesPago = $formPrestamo.elements.mesPagoP.value;
		//creo el formato de la fecha para enviar de tipo dia/mes/año
		var fechaTransaccion = fechaActual.getDate() + "/" + (fechaActual.getMonth() +(1)) + "/" + fechaActual.getFullYear();
		//asignando id segun la cedula y el tiempo enviado, con segundos
		var fechaFinPago = fechaActual.getDate() + "/" + (fechaActual.getMonth() +(mesPago+1)) + "/" + fechaActual.getFullYear();
		//creacion del formdata para flushear los datos al back
		var formData = new FormData();
		var objArr = [];
		//creacion del JSon mediante una cadena
		objArr.push({"idPrestamosEmpleados": idP,
		"fechaFinPrestamo": fechaFinPago,
	    "fechaInicioPrestamo": fechaTransaccion,
	    "montoPrestamo": montoP,
	    "estadoPrestamo": $formPrestamo.elements.estadoPrestamo.value,
	    "fkEmpleadoPrestamo": cedulaEmpleado,
	    "mesesPago": mesPago,
	    "situacionPrestamo": situacionP,
	    "fkCiEmpleadoAdmin": $formPrestamo.elements.fkCiEmpleadoAdmin.value});
	
		formData.append('prestamoEmpleado', JSON.stringify( objArr ));
		
		$.ajax({
			type: "PUT",
			url: "http://localhost:8080/api/prestamo/update",
			data: formData,
			cache: false,
			processData:false,
			contentType:false,
			success: function (result) {
				alertify.alert('Solicitud de prestamo actualizada !')
				
				setTimeout(
					function () {
						window.location.href = "prestamosListaUsuario.html";
					}, 3000);
			},
			error: function (xhr, exception) {
				if (xhr.status === 0)
					alert('Error : ' + xhr.status + 'Datos incorrecto o page su actual prestamo.'+exception);
				else{
					alert('Error : ' + xhr.status + ' Datos incorrecto.');
				}
				
			}
		});
	});
});

$buttonCancelar.addEventListener('click', function(event){
	window.location.href = "prestamosListaUsuario.html";
})