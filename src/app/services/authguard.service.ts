import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import firebase from 'firebase'
require('firebase/auth')

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if(!localStorage.getItem('loggedIn')){
      this.router.navigate(["home"]);
      return false
    
     
    }
    else {
      return true
    }

  
}


}
