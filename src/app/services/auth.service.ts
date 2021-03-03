import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { logging } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth : AngularFireAuth) { }



isLogged(){



}

login(email,password){

  this.fireAuth.signInWithEmailAndPassword(email,password).then(user=>{
    console.log(user,'logged in');
    sessionStorage.setItem("loginState","loggedIn");
  
  }).catch(function(error) {
   
   console.log(error.code);
   console.log(error.message);      
  });
}



forgotPassword(passwordResetEmail) {
  return this.fireAuth.sendPasswordResetEmail(passwordResetEmail)
  .then(() => {
    console.log('Password reset email sent, check your inbox.');
  }).catch((error) => {
    console.log("error")
  })
}



signOut(){
  return this.fireAuth.signOut().then(() => {
    sessionStorage.removeItem('loginState');
    console.log("loggedOut");
  })
}


isloggedIn(){

  if(sessionStorage.getItem('loginState')=="loggedIn"){
    return true;
  }
  else {
    return false;
  }
}





}