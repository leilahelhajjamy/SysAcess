import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['../app.component.scss'],
})
export class HomePage {

  constructor( public navCtrl: NavController,) {}

  lastactivity(){
    this.navCtrl.navigateForward('lastactivity');

  }


}

