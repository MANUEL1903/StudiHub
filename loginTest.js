(function() {

  var database = initialize();
	//get elements
	const txtEmail = document.getElementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
  const txtNombre = document.getElementById('txtNombre');
  const txtColegio = document.getElementById('txtColegio');
	const btnlogin = document.getElementById('btnlogin');
	const btnSignUp = document.getElementById('btnSignUp');
	const btnLogout = document.getElementById('btnLogout');
  const btnMaterias = document.getElementById('btnMaterias');

	//add login event
	btnlogin.addEventListener('click', e => {

		//get email and pass
		const email = txtEmail.value;
		const pass = txtPassword.value;
    r = logIn(email, pass, database);
    usuario = getusuario(email, database);
    console.log('resultado: ' + usuario);
    txtColegio.value = usuario.get('Escuela');
	});

	//Add signup event
	btnSignUp.addEventListener('click', e => {
		//get email and pass
		// TODO: CHECH 4 REAL Email
		const email = txtEmail.value;
		const pass = txtPassword.value;
    const name = txtNombre.value;
    const escuela =  txtColegio.value;
		registerUser(email, pass, name, escuela, e, database);
	});

	btnLogout.addEventListener('click', e => {
    logOut();
	});

	//Add a realtime Listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser) {
      console.log('logged !!');
			btnLogout.classList.remove('hide');
		} else {
			console.log('not logged in');
			btnLogout.classList.add('hide');
		}
	});

  btnMaterias.addEventListener('click', e => {
    GetMaterias('ort', database);
  });

  var txtNombre1 = document.getElementById("Nombre");
  var txtMensaje = document.getElementById("Mensaje");
  var btnEnviar  = document.getElementById("btnEnviar");
  var ChatUl = document.getElementById("ChatUl");

  btnEnviar.addEventListener("click", function() {
    var Nombre = txtNombre1.value;
    var Mensaje = txtMensaje.value;

    addMensaje(Nombre, Mensaje, database);
  });

  database.collection('Chat').onSnapshot(querySnapshot => {
  console.log(`Received query snapshot of size ${querySnapshot.size}`);
  var html ='';
  querySnapshot.forEach(function (e) {
    var element = e.data();
    var Nombre = element.name;
    var Mensaje = element.mensaje;
    var fecha = element.fecha;
    html += "<li><b>"+Nombre+": </b><b>"+Mensaje+": </b>"+fecha+"</li>";
  });
  ChatUl.innerHTML = html;
}, err => {
  console.log(`Encountered error: ${err}`);
});


 }());
