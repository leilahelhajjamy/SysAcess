import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.page.html',
  styleUrls: ['../app.component.scss']
})
export class SignoutPage implements OnInit {

  constructor(public authService : AuthService,public navCtrl: NavController) { }

  ngOnInit() {
  }
  
  SignOut(){
    this.authService.signOut()
    this.navCtrl.navigateForward("home")

  }

}
