var firebaseConfig = {
    apiKey: "AIzaSyB36B227LoRUi8aQd2htDlJNK2DeAjyarg",
    authDomain: "proyect-f4e02.firebaseapp.com",
    databaseURL: "https://proyect-f4e02.firebaseio.com",
    projectId: "proyect-f4e02",
    storageBucket: "proyect-f4e02.appspot.com",
    messagingSenderId: "410878661572",
    appId: "1:410878661572:web:225d6bfc2cedb82ab08a91",
    measurementId: "G-DKN5CLZP8E"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var application = {

        //Propiedad para registrar nuevos usuarios

        Registrar : function () {
        
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;

            firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                // [START_EXCLUDE]
                if (errorCode == 'auth/weak-password') 
                {
                  alert('The password is too weak');
                } 
                else 
                {
                  alert(errorMessage);
                }
                console.log(error);
                // [END_EXCLUDE]
              });
              // [END createwithemail]
        },

        Iniciar : function() {
            
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;        

            firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(function(error) {
                
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode === 'auth/wrong-password') 
                {
                  alert('Wrong password.');
                } 
                else 
                {
                  alert(errorMessage);
                }
                console.log(error);
                document.getElementById('sign-in').disabled = false;
                // [END_EXCLUDE]
              });
              // [END authwithemail]
        },

        Salir : function() {

            firebase.auth().signOut().then(function(){
                console.log('Salir');
            }).cathc(function(error){
                console.log(error);
            })

        },

        Observador : function() {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user){
                    //user is signed in.
                    var displayName = user.displayName;
                    var email = user.email;
                    var emailVerified = user.emailVerified;
                    var photoURL = user.photoURL;
                    var isAnonymoys = user.isAnonymoys;
                    var uid = user.uid;
                    var providerData = user.providerData;
                    //...

                    document.getElementById("User").innerHTML = displayName;
                    document.getElementById("SubTexto").style.backgroundImage = "url("+photoURL+")"
                    document.getElementById("SubTexto").style.backgroundSize = "50px"             
                }
                else
                {
                    document.getElementById("User").innerHTML = "desconectado"
                }
            });
        }
    }
    application.Observador();
      

