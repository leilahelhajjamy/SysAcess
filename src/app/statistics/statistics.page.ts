import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivityService } from '../services/activity.service';
import { Chart } from 'chart.js';
import { parse } from 'node:path';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
import { StatisticMoiModalPage } from '../statistic-moi-modal/statistic-moi-modal.page';
import { ModalController } from '@ionic/angular';
import { StatisticAnneeModalPage } from '../statistic-annee-modal/statistic-annee-modal.page';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['../app.component.scss'],
})
export class StatisticsPage implements OnInit {
  @ViewChild('barChart', { static: true }) barChart;
  @ViewChild('barChartMonth', { static: true }) barChartMonth;
  @ViewChild('barChartMonthSelected', { static: true }) barChartMonthSelected;
  carteId;
  nom;
  prenom;
  monthChoisi;
  anneeChoisie;
  barsCurrent: any;
  barsMonth;
  anneeActuelle;
  colorArray = [
    '#EFCB68',
    '#160C28',
    '#FFFFFF',
    '#D74E09',
    '#40587A',
    '#EFCB68',
    '#160C28',
    '#FFFFFF',
    '#D74E09',
    '#40587A',
    '#EFCB68',
    '#160C28',
  ];
  colorArrayColors = [
    '#EFCB68',
    '#160C28',
    '#FFFFFF',
    '#D74E09',
    '#40587A',
    '#EFCB68',
    '#160C28',
    '#FFFFFF',
    '#D74E09',
    '#40587A',
    '#EFCB68',
    '#160C28',
    '#FFFFFF',
    '#D74E09',
    '#40587A',
    '#EFCB68',
    '#160C28',
    '#FFFFFF',
    '#D74E09',
    '#40587A',
    '#EFCB68',
    '#160C28',
    '#FFFFFF',
    '#D74E09',
    '#40587A',
    '#EFCB68',
    '#160C28',
    '#FFFFFF',
    '#D74E09',
    '#40587A',
    '#EFCB68',
  ];

  nowYear;
  nowMonth;
  months = [];
  monthss = [];
  days = [];
  daysTimesatamps = [];
  statisticsMonth = [];
  statisticsMonthSelected = [];
  statisticsYear = [];
  NumberOfHoursYear;
  NumberOfHoursMonth;
  activities = [];
  NbMoisPasse = 0;
  MoyenneMois;
  MoyenneSemaine;
  MoinsHuitMois = 0;
  PickerOptions: any;
  formYear: FormGroup;
  formMonth: FormGroup;

  constructor(
    public router: Router,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    public activityService: ActivityService,
    public formBuilder: FormBuilder,
    public db: AngularFireDatabase
  ) {
    this.nowYear = new Date().getFullYear();
    this.anneeActuelle = this.nowYear.valueOf();
    this.nowMonth = new Date().getMonth() + 1;

    this.PickerOptions = {
      cssClass: 'MyDatePickerYear',
    };

    this.formYear = this.formBuilder.group({
      anneeChoisie: new FormControl('', Validators.required),
    });
    this.formMonth = this.formBuilder.group({
      monthChoisi: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.carteId = this.activatedRoute.snapshot.paramMap.get('carteId');
    this.nom = this.activatedRoute.snapshot.paramMap.get('nom');
    this.prenom = this.activatedRoute.snapshot.paramMap.get('prenom');
    console.log(this.nom);
    for (let i = 1; i <= this.nowMonth; i++) {
      this.monthss.push(
        this.nowYear.toString() + '-0' + i.toString().toString()
      );
      this.NbMoisPasse++;
    }
    this.monthss.map((element) => console.log('mmoi', element));
    this.getCurrentYear();
    this.getCurrentYearStatistics();
    this.nbHeureMois();
    this.moyenneHeures();
    this.getCurrentMonthDays();
    this.moinsHuitHeures();
  }

  moyenneHeures() {
    this.MoyenneMois = Math.floor(this.NumberOfHoursYear / this.NbMoisPasse);
    this.MoyenneSemaine = Math.floor(
      this.NumberOfHoursYear / (this.NbMoisPasse * 4.35)
    );
  }

  moinsHuitHeures() {
    const myArray = this.statisticsMonth.filter((elt) => elt < 8 && elt > 0);
    myArray.forEach((elet) => {
      this.MoinsHuitMois++;
    });
  }

  nbHeureMois() {
    const myArray = this.statisticsYear.filter((element) => element > 0);
    myArray.map((elt) => {
      console.log(elt);
    });
    this.NumberOfHoursMonth = myArray[myArray.length - 1];
    console.log(this.NumberOfHoursMonth);
  }

  ionViewDidEnter() {
    this.functionTwo();
  }

  functionOne() {
    setTimeout(() => {
      this.getCurrentYearStatistics;
      this.getCurrentMonthDays();
      //this.getCurrentMonthNumberOfHours()
      //this.getCurrentYear()
    }, 2000);

    return 1;
  }

  async functionTwo() {
    const resultOne = await this.functionOne();

    if (resultOne) {
      this.createBarChart();
    }
    const resultTwo = await this.functionOne();
    if (resultOne) {
      this.createBarChartMonth();
    }
  }

  getCurrentYear() {
    var year = -1 * Date.parse(this.nowYear.toString());
    console.log(year);
    var yearString = year.toString();
    this.NumberOfHoursYear = this.activityService.getStatisticsCurrentYear(
      this.carteId,
      yearString
    );
    return this.NumberOfHoursYear;
  }

  getCurrentYearStatistics() {
    for (let i = 1; i <= 12; i++) {
      var month = (
        -1 * Date.parse(this.nowYear.toString() + '-0' + i.toString())
      ).toString();
      console.log(typeof month);
      this.months.push(month);
    }
    this.months.forEach((element, key) => {
      var NbOfHours;
      if (key < 11) {
        NbOfHours = this.activityService.getStatisticsByMonth(
          this.carteId,
          element,
          this.months[key + 1]
        );
        if (NbOfHours != null) {
          this.statisticsYear.push(NbOfHours);
        }
      } else if (key == 11) {
        NbOfHours = this.activityService.getStatisticsByMonth(
          this.carteId,
          element,
          element + 24 * 31 * 3.6 * 1000000
        );
        if (NbOfHours != null) {
          this.statisticsYear.push(NbOfHours);
        }
      }
    });

    this.createBarChart();
  }

  getCurrentMonthDays() {
    var now = new Date();
    var length = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= length; i++) {
      this.days.push(i);
    }

    if (this.nowMonth < 10) {
      this.nowMonth = (
        -1 *
        Date.parse(this.nowYear.toString() + '-0' + this.nowMonth.toString())
      ).toString();
    } else if (this.nowMonth > 10) {
      this.nowMonth = (
        -1 * Date.parse(this.nowYear.toString() + this.nowMonth.toString())
      ).toString();
    }
    var timestamp = this.nowMonth;
    for (let i = 1; i <= length; i++) {
      this.daysTimesatamps.push(timestamp);
      var tp = parseInt(timestamp) - 8.64 * 10000000;
      timestamp = tp.toString();
    }

    this.daysTimesatamps.forEach((element, key) => {
      console.log(typeof element);
      var NbOfHours;
      if (key == length - 1) {
        NbOfHours = this.activityService.getStatisticsByMonth(
          this.carteId,
          element,
          (parseInt(timestamp) - 8.64 * 10000000).toString()
        );
      } else {
        NbOfHours = this.activityService.getStatisticsByMonth(
          this.carteId,
          element,
          this.daysTimesatamps[key + 1]
        );
      }
      if (NbOfHours != null) {
        this.statisticsMonth.push(NbOfHours);
      }
    });

    this.createBarChartMonth();
  }

  createBarChart() {
    this.barsCurrent = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: [
          'Jan',
          'Fév',
          'Mar',
          'Avr',
          'Mai',
          'Jui',
          'Juil',
          'Aoû',
          'Sept',
          'Oct',
          'Nov',
          'Déc',
        ],
        datasets: [
          {
            label: ["Nombre d'heures totales par mois"],
            data: this.statisticsYear,
            backgroundColor: this.colorArray, // array should have same number of elements as number of dataset
            borderColor: this.colorArray, // array should have same number of elements as number of dataset
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  createBarChartMonth() {
    this.barsMonth = new Chart(this.barChartMonth.nativeElement, {
      type: 'bar',
      data: {
        labels: this.days,
        datasets: [
          {
            label: ["Nombre d'heures par jours "],
            data: this.statisticsMonth,
            backgroundColor: this.colorArrayColors, // array should have same number of elements as number of dataset
            borderColor: this.colorArrayColors, // array should have same number of elements as number of dataset
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  async onChange(evt) {
    if (evt) {
      console.log(new Date(evt));
      this.presentModal(evt);
    }
  }

  async onChangeAnnee(evt) {
    if (evt) {
      console.log(new Date(evt));
      this.presentModalAnnee(evt);
    }
  }
  async presentModal(evt) {
    const modal = await this.modalController.create({
      component: StatisticMoiModalPage,
      cssClass: 'my-modal-class',
      componentProps: {
        moi: evt,
        carteId: this.carteId,
      },
    });
    return await modal.present();
  }
  async presentModalAnnee(evt) {
    const modal = await this.modalController.create({
      component: StatisticAnneeModalPage,
      cssClass: 'my-modal-class',
      componentProps: {
        annee: this.anneeChoisie,
        carteId: this.carteId,
      },
    });
    return await modal.present();
  }
}
