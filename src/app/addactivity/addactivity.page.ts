import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { timeStamp } from 'node:console';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.page.html',
  styleUrls: ['./addactivity.page.scss'],
})
export class AddactivityPage implements OnInit {
  formActivityAdd : FormGroup;
  now = -1 * new Date().getTime();
  carteId
  type
  constructor(public activityService : ActivityService, public formBuilder : FormBuilder) { 

    this.formActivityAdd = this.formBuilder.group({

      carteId : new FormControl('', Validators.required),
      type : new FormControl('', Validators.required),
      timestamp :new FormControl('', Validators.required), 
    
    });

  }


  ngOnInit() {
  }

  save(){

    this.activityService.save(this.carteId,this.now,this.type)
  }


  saveTimeStamp(timestamp){
    this.activityService.saveTimeStamp(this.carteId,timestamp,this.type)

  }


}
