const $formLogin = document.getElementById('formLogin');

$(document).ready(function() {
	$(document).delegate('#sendLogin', 'click', function(event) {
		event.preventDefault()
		
		var cedula = $formLogin.elements.usuario.value;
		var pwd = $formLogin.elements.passw.value;
		
		console.log("prueba")
		$.ajax({
			type: 'GET',
		        url: "http://localhost:8080/api/prestamo/login/" + cedula +"/"+pwd,
				success: function(result) {
				console.log(result);
				alertify.alert('Solicitud de prestamo guardado !')
				
				setTimeout(
					function () {
						window.location.href = "menu.html";
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