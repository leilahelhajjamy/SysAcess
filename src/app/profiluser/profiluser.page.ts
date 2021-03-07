import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../services/activity.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-profiluser',
  templateUrl: './profiluser.page.html',
  styleUrls: ['../app.component.scss'],
})
export class ProfiluserPage implements OnInit {
  carteId : string;
  carteID
  User 
  activities
  formUserModify: FormGroup;
  authorised
  constructor(public formBuilder : FormBuilder,public activityService : ActivityService,private userService : UserService ,private activatedRoute: ActivatedRoute) {

    this.formUserModify = this.formBuilder.group({
      nom : new FormControl('', Validators.compose([
          Validators.required
      ])),
      prenom : new FormControl('', Validators.compose([
           Validators.required
      ])),
      poste : new FormControl('', Validators.compose([
        Validators.required
      ])),
      carteID  : new FormControl('', Validators.compose([
        Validators.required
      ])),
      authorised : new FormControl('', Validators.compose([
        Validators.required
   ]))
});

   }

  ngOnInit() {
    this.User = {
      nom : '',
      prenom: '',
      poste: '',
      carteId: '',
      authorised:false
    };
    this.carteId = this.activatedRoute.snapshot.paramMap.get('carteId');
    this.userService.getUser(this.carteId).valueChanges().subscribe(res=>{
     this.User.nom=res['2']
     this.User.prenom=res['4']
     this.User.carteId=res['1']
     this.User.poste=res['3']
     this.User.authorised=res['0']
     this.authorised=res['0']
     console.log(this.User.authorised)
    })

    this.getActivityByUser()
  }


getActivityByUser(){
  this.activities=this.activityService.getActivityByUser(this.carteId)
}



}
