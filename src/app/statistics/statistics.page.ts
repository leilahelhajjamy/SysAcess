import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivityService } from '../services/activity.service';
import { Chart } from 'chart.js';
import { parse } from 'node:path';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['../app.component.scss'],
})
export class StatisticsPage implements OnInit {

  @ViewChild('barChart', {static: true}) barChart;
  @ViewChild('barChartMonth', {static: true}) barChartMonth;

  carteId 
  nom
  prenom

  barsCurrent: any;
  barsMonth
  colorArray = [ "#f4acb7","#ffb5a7","#e6b8a2","#f2c6de","#e56b6f","#fec89a","#9a8c98","#ff99ac","#f4acb7","#ffb5a7","#e6b8a2","#f2c6de"]
  colorArrayColors =["#f4acb7","#ffb5a7","#e6b8a2","#f2c6de","#e56b6f","#fec89a","#9a8c98","#ff99ac","#f4acb7","#ffb5a7","#e6b8a2","#f2c6de","#f4acb7","#ffb5a7","#e6b8a2","#f2c6de","#e56b6f","#fec89a","#9a8c98","#ff99ac","#f4acb7","#ffb5a7","#e6b8a2","#f2c6de","#f4acb7","#ffb5a7","#e6b8a2","#f2c6de","#e56b6f","#fec89a","#9a8c98"] 
  
  nowYear 
  nowMonth
  months = []
  days=[]
  daysTimesatamps=[]
  statisticsMonth =[]
  statisticsYear = []
  NumberOfHoursYear
  NumberOfHoursMonth
  activities=[]

  PickerOptions: any;
  formYear : FormGroup


  constructor(public router : Router ,private activatedRoute: ActivatedRoute,public activityService : ActivityService, public formBuilder : FormBuilder,public db: AngularFireDatabase) {
    this.nowYear = new Date().getFullYear()
    this.nowMonth = new Date().getMonth() +1

    this.PickerOptions = {
      cssClass :"MyDatePickerYear"
    }

    this.formYear = this.formBuilder.group({

      year : new FormControl('', Validators.required),
      
    });
   

   }







  ngOnInit() {
    this.carteId = this.activatedRoute.snapshot.paramMap.get('carteId');
    this.nom = this.activatedRoute.snapshot.paramMap.get('nom');
    this.prenom = this.activatedRoute.snapshot.paramMap.get('prenom');
    console.log(this.nom)
    this.getCurrentYear()
    this.getCurrentMonthDays()

  }






  ionViewDidEnter() {

  //this.getCurrentMonth()
   this.functionTwo()
   // this.createBarChart()
  //this.createBarChartYearChoose()
   
    
  }



  functionOne(){

    setTimeout(() => {
      this.getCurrentMonth()
      this.getCurrentMonthDays()
      //this.getCurrentMonthNumberOfHours()
      //this.getCurrentYear()
      }, 2000);

      return 1

  }

  async functionTwo() {

   const resultOne = await this.functionOne()
   if(resultOne){
      this.createBarChart()
   }
   const resultTwo  = await this.functionOne()
   if(resultOne){
      this.createBarChartMonth()
   }


  }







  getCurrentYear(){
     
    var year = (-1)*Date.parse(this.nowYear.toString())
    console.log(year)
    var yearString = year.toString()
    this.NumberOfHoursYear = this.activityService.getStatisticsCurrentYear(this.carteId,yearString)
    return this.NumberOfHoursYear

   }


   getCurrentMonthNumberOfHours(){
     
    var month = (-1)*Date.parse(this.nowYear)
    var monthString = month.toString()
    this.NumberOfHoursMonth = this.activityService.getStatisticsCurrentMonth(this.carteId,monthString)
    console.log('numberOfHoursMonth',this.NumberOfHoursMonth)
    return this.NumberOfHoursMonth
    

   }
















  getCurrentMonth(){ 
      for (let i = 1 ; i <= 12 ; i++ ){
        var month = ((-1)*Date.parse(this.nowYear.toString() +"-0"+ i.toString())).toString()
        console.log(typeof(month))
        this.months.push(month)
      }
      this.months.forEach((element,key) =>{
      
      if(key<11){

        var NbOfHours = this.activityService.getStatisticsByMonth(this.carteId,element,this.months[key+1])
        if(NbOfHours!=null){
    
          this.statisticsYear.push(NbOfHours)
      
        }
     }
     else if (key == 11){
      var NbOfHours =this.activityService.getStatisticsByMonth(this.carteId,element,element+(24*31*3.6*1000000))
      if(NbOfHours!=null){
    
        this.statisticsYear.push(NbOfHours)
      
      }
      
    }
    })

    this.createBarChart()
      
   }


   getCurrentMonthDays(){ 

    var now = new Date();
    var length = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    for (let i = 1 ; i <= length ; i++ ){
      this.days.push(i)
    
    }

    if(this.nowMonth <10){
      this.nowMonth = ((-1)*Date.parse(this.nowYear.toString() +"-0"+ this.nowMonth.toString())).toString()
     
    }
    else if( this.nowMonth >10 ){
      this.nowMonth = ((-1)*Date.parse(this.nowYear.toString() + this.nowMonth.toString())).toString()
     
    }
      var timestamp = this.nowMonth
     for (let i = 1 ; i <= length ; i++ ){ 
        this.daysTimesatamps.push(timestamp)
        var tp = parseInt(timestamp) - (8.64 * 10000000) 
        timestamp = tp.toString()     
        
    }


    this.daysTimesatamps.forEach((element,key) =>{
        console.log(typeof(element))
        var NbOfHours
        if(key==30){
           NbOfHours = this.activityService.getStatisticsByMonth(this.carteId,element,element+(parseInt(timestamp) - (8.64 * 10000000)).toString())
        
        }
        else {
          NbOfHours = this.activityService.getStatisticsByMonth(this.carteId,element,this.daysTimesatamps[key+1])
       
        }
        if(NbOfHours!=null){    
          this.statisticsMonth.push(NbOfHours)      
        }
          
    })

    this.createBarChartMonth()


  }

  
 












   createBarChart() {

    this.barsCurrent = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jui', 'Juil', 'Aoû', 'Sept', 'Oct', 'Nov', 'Déc'],
        datasets: [{
          label: ["Nombre d'heures totales par mois"],
          data: this.statisticsYear,
          backgroundColor: this.colorArray, // array should have same number of elements as number of dataset
          borderColor: this.colorArray,// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    
  }





 createBarChartMonth() {

    this.barsMonth = new Chart(this.barChartMonth.nativeElement, {
      type: 'bar',
      data: {
        labels: this.days,
        datasets: [{
          label: ["Nombre d'heures par jours "],
          data: this.statisticsMonth,
          backgroundColor: this.colorArrayColors, // array should have same number of elements as number of dataset
          borderColor: this.colorArrayColors,// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    
  }


 

}
