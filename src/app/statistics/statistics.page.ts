import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  formStatistics :FormGroup
  formMonth:FormGroup
  formYear:FormGroup
  year:FormGroup
  diff
 nowYear = new Date().getFullYear()
 nowMonth = new Date().getMonth() +1
 now
  constructor(public activityService : ActivityService, public formBuilder : FormBuilder,public db: AngularFireDatabase) {
    this.formStatistics = this.formBuilder.group({

      carteId : new FormControl('', Validators.required),
      monthStart : new FormControl('', Validators.required),
      monthEnd : new FormControl('', Validators.required),
    });

    this.formYear = this.formBuilder.group({

      year : new FormControl('', Validators.required),
   
    });

    this.formMonth = this.formBuilder.group({

      month : new FormControl('', Validators.required),
      
    });

    if(this.nowMonth<10){
      this.now = this.nowYear.toString() +"-0"+this.nowMonth.toString()+"-01"
    }else{
      this.now = this.nowYear.toString() +"-"+this.nowMonth.toString()+"-01"
    }

    

  
   }

  ngOnInit() {
  }




getStatisticsByMonth(carteId,monthStart,monthEnd){
 this.activityService.getStatisticsByMonth(carteId,monthStart,monthEnd)    
}


getMonth(month){
var MonthAfter
var MonthActuel
var Month 
var monthSplit
var MonthArgument
var MonthAfterArgument
  console.log(month)
  monthSplit=month.split('-')
  MonthActuel = parseInt(monthSplit[1]) 
  Month = monthSplit[0]+'-'+monthSplit[1]+'-01T00:00:00.000+01:00'
  console.log('Month',Month)
  Month = Date.parse(Month)
  console.log('TimeStampMonthActuel',Month )
if(MonthActuel < 12){
  MonthAfter = parseInt(monthSplit[1]) + 1
  console.log('monthAfter',MonthAfter)
  if(MonthAfter<10){
    MonthAfter= "0"+MonthAfter.toString()
    console.log('MonthAfter',MonthAfter)
    MonthAfter = monthSplit[0]+'-'+MonthAfter+'-01T00:00:00.000+01:00'
    console.log('monthAfter',MonthAfter)
    MonthAfter = Date.parse(MonthAfter)
    console.log('TimeStampMonthAfter',MonthAfter)
  }
}

else if (MonthActuel == 12){
  MonthAfter = parseInt(monthSplit[1]) 
  console.log('monthAfter',MonthAfter)
  if(MonthAfter<10){
    MonthAfter= "0"+MonthAfter.toString()
    console.log('MonthAfter',MonthAfter)
    MonthAfter = monthSplit[0]+'-'+MonthAfter+'-31T23:59:59.000+01:00'
    console.log('monthAfter',MonthAfter)
    MonthAfter = Date.parse(MonthAfter)
    console.log('TimeStampMonthAfter',MonthAfter)

  }
 
}

MonthArgument =(-1 * Month).toString()
MonthAfterArgument = (-1 * MonthAfter).toString()
this.getStatisticsByMonth('TY 76 87 8H',MonthArgument,MonthAfterArgument)


}



getYear(year){

}




}
