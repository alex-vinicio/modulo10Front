$(document).ready(function () {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const id = urlParams.get('id')
	//cargando los datos
	$.getJSON('http://localhost:8080/api/prestamo/'+id, function(json) {
			document.getElementById('fkCiEmpleadoAdmin').value = json.fkCiEmpleadoAdmin
			document.getElementById("estadoPrestamo").value = json.estadoPrestamo;
			document.getElementById('idP').value = json.idPrestamosEmpleados
			document.getElementById("cedulaP").value = json.fkEmpleadoPrestamo;
			document.getElementById("mesPagoP").value = json.mesesPago;
			document.getElementById("montoP").value = json.montoPrestamo;
			document.getElementById("estadoP").value = json.situacionPrestamo;
		});
});