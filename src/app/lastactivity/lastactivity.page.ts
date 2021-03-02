import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lastactivity',
  templateUrl: './lastactivity.page.html',
  styleUrls: ['../app.component.scss'],
})
export class LastactivityPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }


  back(){
    this.navCtrl.navigateBack('');
  }
}
