const $buttonCancelar = document.getElementById('cancelar');
const $formHojasDeCobro = document.getElementById('formHojasDeCobro');
$(document).ready(function() {
	$(document).delegate('#enviarHojaDeCobro', 'click', function(event) {
		event.preventDefault()
		
		var cedulaEmpleado = $formHojasDeCobro.elements.cedulaCliente.value;
		var montoP = $formHojasDeCobro.elements.cantidadPagoHDC.value;
		var idHDC = $formHojasDeCobro.elements.idHDC.value;
		var sectorHDC = $formHojasDeCobro.elements.sectorHDC.value;
		var tipoDePago = $formHojasDeCobro.elements.tipoDePago.value;
		//creo el formato de la fecha para enviar de tipo dia/mes/año
		var fechaTransaccion = fechaActual.getDate() + "/" + (fechaActual.getMonth() +(1)) + "/" + fechaActual.getFullYear();
		//creacion del formdata para flushear los datos al back
		var formData = new FormData();
		var objArr = [];
		//creacion del JSon mediante una cadena
		objArr.push({"idHojaDeCobro": idHDC,
		"fechaInicioPrestamo": fechaTransaccion,
	    "monstoPrestamo": montoP,
		"sector": sectorHDC,

	    //"estadoPrestamo": $formPrestamo.elements.estadoPrestamo.value,
	    "fkEmpleadoPrestamo": cedulaEmpleado,
	    //"mesesPago": mesPago,
	    "tipoDePago": tipoDP,
	    "fkCiEmpleadoAdmin": $formHojasDeCobro.elements.fkCiEmpleadoAdmin.value});
	
		formData.append('hojasDeCobro', JSON.stringify( objArr ));
		
		$.ajax({
			type: "PUT",
			url: "http://localhost:8080/api/hojasDeCobro/update",
			data: formData,
			cache: false,
			processData:false,
			contentType:false,
			success: function (result) {
				alertify.alert('Solicitud de hoja de Cobro actualizada !')
				
				setTimeout(
					function () {
						window.location.href = "hojasDeCobroListaUsuario.html";
					}, 3000);
			},
			error: function (xhr, exception) {
				if (xhr.status === 0)
					alert('Error : ' + xhr.status + 'Datos incorrectos'+exception);
				else{
					alert('Error : ' + xhr.status + ' Datos incorrecto.');
				}
				
			}
		});
	});
});

$buttonCancelar.addEventListener('click', function(event){
	window.location.href = "hojasDeCobroListaUsuario.html";
})

