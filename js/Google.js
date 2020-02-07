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

    SignIn : function () {
        if (firebase.auth().currentUser) 
        {
          // [START signout]
          firebase.auth().signOut();
          // [END signout]
        } 
        else 
        {
          var email = document.getElementById('email').value;
          var password = document.getElementById('password').value;
          if (email.length < 4) 
          {
            alert('Introduce un correo.');
            return;
          }
          if (password.length < 4) 
          {
            alert('Introduce una contraseña.');
            return;
          }

          // Sign in with email and pass.
          // [START authwithemail]

          firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) 
          {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            // [START_EXCLUDE]
            if (errorCode === 'auth/Contraseña-inválida') 
            {
              alert('Contraseña inválida.');
            } 
            else 
            {
              alert(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
          });
          // [END authwithemail]
        }
        document.getElementById('quickstart-sign-in').disabled = true;
    },

    SignUP : function () {

        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) 
        {
          alert('Introduce un correo.');
          return;
        }
        if (password.length < 4) 
        {
          alert('Introduce una contraseña.');
          return;
        }

        // Sign in with email and pass.
        // [START createwithemail]

        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) 
        {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/contraseña-débil') 
          {
            alert('La contraseña es muy débil.');
          } else 
          {
            alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
        });
        // [END createwithemail]
    },

    SingOut: function(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
    },

    Verificacion : function () {
        // [START sendemailverification]
        firebase.auth().currentUser.sendEmailVerification().then(function() 
        {
          // Email Verification sent!
          // [START_EXCLUDE]
          alert('Email Verificacion Enviado!');
          // [END_EXCLUDE]
        });
        // [END sendemailverification]
    },

    Contraseña : function () {
        var email = document.getElementById('email').value;
        // [START sendpasswordemail]

        firebase.auth().sendPasswordResetEmail(email).then(function() 
        {
          // Password Reset Email Sent!
          // [START_EXCLUDE]
          alert('Contraseña Reset Email Enviado!');
          // [END_EXCLUDE]
        }).catch(function(error) 
        {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/email-inválido') 
          {
            alert(errorMessage);
          } 
          else if (errorCode == 'auth/Usuario no encontrado') 
          {
            alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
        });
        // [END sendpasswordemail];
    },

    Observador : function() {

        // Listening for auth state changes.
        // [START authstatelistener]

        firebase.auth().onAuthStateChanged(function(user) {
          // [START_EXCLUDE silent]
          document.getElementById('quickstart-verify-email').disabled = true;

          // [END_EXCLUDE]
         
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // [START_EXCLUDE]
            document.getElementById('sign-in-status').textContent = 'Signed in';
            document.getElementById('sign-in').textContent = 'Sign out';
            document.getElementById('account-details').textContent = JSON.stringify(user, null, '  ');
            if (!emailVerified) {
              document.getElementById('verify-email').disabled = false;
            }
            // [END_EXCLUDE]
          } else {
            // User is signed out.
            // [START_EXCLUDE]
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
            // [END_EXCLUDE]
          }
          // [START_EXCLUDE silent]
          document.getElementById('sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authstatelistener]
  
        document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
        document.getElementById('sign-up').addEventListener('click', handleSignUp, false);
        document.getElementById('verify-email').addEventListener('click', sendEmailVerification, false);
        document.getElementById('password-reset').addEventListener('click', sendPasswordReset, false);
      }
      
}
application.Observador();
