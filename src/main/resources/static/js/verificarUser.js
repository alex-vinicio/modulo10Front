var rol = parseInt(localStorage.getItem("idRol"));
		if ((typeof localStorage.id === "undefined") ){
			alert("Acceso no permitido");
			window.location.href = "index.html";	
		}else{
			if(rol !== 1){
				alert("Usuario no permitido");
				window.location.href = "menu.html";	
			}
		}