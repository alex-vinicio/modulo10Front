$(document).ready(function () {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const id = urlParams.get('id')
	//cargando los datos
	$.getJSON('http://localhost:8080/api/hojasDeCobro/'+id, function(json) {
			document.getElementById('idHDC').value = json.idHojaDeCobro
			document.getElementById("cedulaCliente").value = fkCiUsuario;
			document.getElementById('cantidadpagoHDC').value = json.cantidadApagar
			document.getElementById("sectorHdc").value = json.sector;
			document.getElementById("tipoPago").value = json.tipoDePago;
			//document.getElementById("montoP").value = json.montoPrestamo;
			//document.getElementById("estadoP").value = json.situacionPrestamo;
		});
	});