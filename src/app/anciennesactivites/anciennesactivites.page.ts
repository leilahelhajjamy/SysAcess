import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { element } from 'protractor';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-anciennesactivites',
  templateUrl: './anciennesactivites.page.html',
  styleUrls: ['../app.component.scss'],
})
export class AnciennesactivitesPage implements OnInit {

  carteId
  nom
  prenom
  now
  months =[]
  activities =[]
  nowYear = new Date().getFullYear()
  nowMonth = new Date().getMonth() +1
  nowForMonth
  formMonth
  
  
  constructor(public formBuilder : FormBuilder,public activityService : ActivityService,public router : Router ,public alertController: AlertController,private activatedRoute: ActivatedRoute) 
  { 

    this.formMonth = this.formBuilder.group({
      monthChoisi : new FormControl('', Validators.compose([
          Validators.required
      ]))
    });



    if(this.nowMonth<10){
      this.now = this.nowYear.toString() +"-0"+this.nowMonth.toString() +"-01"
    }else{
      this.now = this.nowYear.toString() +"-"+this.nowMonth.toString()+"-01"
    }


    if(this.nowMonth<10){
      this.nowForMonth = this.nowYear.toString() +"-0"+this.nowMonth.toString()+"-01"
    }else{
      this.nowForMonth = this.nowYear.toString() +"-"+this.nowMonth.toString()+"-01"
    }

  }



  ngOnInit() {

    this.carteId = this.activatedRoute.snapshot.paramMap.get('carteId');
    this.nom = this.activatedRoute.snapshot.paramMap.get('nom');
    this.prenom = this.activatedRoute.snapshot.paramMap.get('prenom');
    for(let i=1; i < this.nowMonth ;i++){
      this.months.push(this.nowYear.toString() +"-0"+ i.toString().toString())
      
    }

    this.months.forEach(element=>{
      console.log(element)
    })

  }



 onChange(evt) {

  this.activities =[]
  console.log(evt)
  var MonthAfter
  var MonthActuel
  var Month 
  var monthSplit
  var MonthArgument
  var MonthAfterArgument
    monthSplit= evt.split('-')
    MonthActuel = parseInt(monthSplit[1]) 
    Month = monthSplit[0]+'-'+monthSplit[1]+'-01T00:00:00.000+01:00'
    Month = Date.parse(Month) 
  if(MonthActuel < 12){
    MonthAfter = parseInt(monthSplit[1]) + 1
    if(MonthAfter<10){
      MonthAfter= "0"+MonthAfter.toString()
      MonthAfter = monthSplit[0]+'-'+MonthAfter+'-01T00:00:00.000+01:00'
      MonthAfter = Date.parse(MonthAfter)
   
    }
  }
  
  else if (MonthActuel == 12){
    MonthAfter = parseInt(monthSplit[1]) 
    if(MonthAfter<10){
      MonthAfter= "0"+MonthAfter.toString() 
      MonthAfter = monthSplit[0]+'-'+MonthAfter+'-31T23:59:59.000+01:00'
    
      MonthAfter = Date.parse(MonthAfter)
    }
   
  }

  
  MonthArgument =(-1 * Month).toString()
  MonthAfterArgument = (-1 * MonthAfter).toString()
  
  console.log(Month.toString())
  this.activities=this.activityService.getActivitiesByMonth(this.carteId,MonthArgument, MonthAfterArgument)


  }



}
