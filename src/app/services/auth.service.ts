import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { logging } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireAuth : AngularFireAuth) { }





forgotPassword(passwordResetEmail) {
  return this.fireAuth.sendPasswordResetEmail(passwordResetEmail)
  .then(() => {
    console.log('Password reset email sent, check your inbox.');
  }).catch((error) => {
    console.log(error)
  })
}



signOut(){
  return this.fireAuth.signOut().then(() => {
    localStorage.removeItem('loggedIn')
    console.log("loggedOut");
  })
}








}