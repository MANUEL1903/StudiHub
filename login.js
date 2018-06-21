function initialize() {
  const config = {
    apiKey: "AIzaSyDpymKRk8FMdhsOT1OxJdZBcD9ixTzCeF4",
    authDomain: "app-de-estudio.firebaseapp.com",
    projectId: "app-de-estudio",
    databaseURL: "https://app-de-estudio.firebaseio.com",
    storageBucket: "app-de-estudio.appspot.com",
  };

  firebase.initializeApp(config);
  var database=firebase.firestore();
  return database;
}

function registerUser(email, pass, name, school, e, database) {
  const auth = firebase.auth();

  var usu = database.collection('Usuarios').doc(name);
  console.log(usu);

  const promise = auth.createUserWithEmailAndPassword(email, pass).then(function(user) {
    var user = firebase.auth().currentUser;

    var data = {
       name: name,
       Escuela: school,
       email: email,
    };

    database.doc('Usuarios/' + email).set(data);


  }, function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error.message);
  });

}

function logIn (email, pass, database){
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass); //"manujad@hotmail.com.ar", "la clave");
    promise.catch(e => console.log(e));
}

function getusuario(email, database){
  var usuarioRef = database.collection('Usuarios').doc(email);
  var aux = 'hola';
  var getDoc = usuarioRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
        return null;
      } else {
        console.log('Document data:', doc.data());
        aux = doc.data();
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
    return aux;
}


function logOut(){
  firebase.auth().signOut();
}
