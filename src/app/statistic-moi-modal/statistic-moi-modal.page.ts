import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivityService } from '../services/activity.service';
import { Chart } from 'chart.js';
import { parse } from 'node:path';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-statistic-moi-modal',
  templateUrl: './statistic-moi-modal.page.html',
  styleUrls: ['../app.component.scss'],
})
export class StatisticMoiModalPage implements OnInit {
  @Input() moi: string;
  @Input() carteId: string;
  @ViewChild('barChartMonth', { static: true }) barChartMonth;
  nbreJoursMoinsHuit = 0;
  nbreJoursAbscence = 0;
  nbreHeuresMoi;
  nowYear;
  days = [];
  daysTimesatamps = [];
  statisticsMonthSelected = [];
  barsMonth;
  NumberOfHoursYear;
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
  constructor(
    private modalController: ModalController,
    private activityService: ActivityService
  ) {
    this.nowYear = new Date().getFullYear();
  }

  ngOnInit() {
    console.log(this.moi);
    this.getMonthSelectedStatistics(this.moi);
    this.getNbreHoursMonthSelected();
  }

  ionViewDidEnter() {
    this.createBarChartMonth();
  }

  getMonthSelectedStatistics(evt) {
    var now = new Date(evt);
    var MonthArgument;
    var length = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= length; i++) {
      this.days.push(i);
    }

    MonthArgument = -1 * Date.parse(evt);
    console.log('monthArgument', MonthArgument);
    console.log('timestamp selected', now);
    var timestamp = MonthArgument.toString();
    for (let i = 1; i <= length; i++) {
      this.daysTimesatamps.push(timestamp);
      var tp = parseInt(timestamp) - 8.64 * 10000000;
      timestamp = tp.toString();
    }

    this.daysTimesatamps.forEach((element, key) => {
      var NbOfHours;
      if (key == length - 1) {
        NbOfHours = this.activityService.getStatisticsByMonth(
          this.carteId,
          element,
          parseInt(timestamp).toString()
        );
        this.nbreHeuresMoi = this.nbreHeuresMoi + NbOfHours;
      } else {
        NbOfHours = this.activityService.getStatisticsByMonth(
          this.carteId,
          element,
          this.daysTimesatamps[key + 1]
        );
        this.nbreHeuresMoi = this.nbreHeuresMoi + NbOfHours;
      }
      if (!NbOfHours) {
        this.nbreJoursAbscence++;
      }
      if (NbOfHours != null) {
        this.statisticsMonthSelected.push(NbOfHours);
        if (NbOfHours < 8 && NbOfHours > 0) {
          this.nbreJoursMoinsHuit++;
        }
      }
    });

    this.createBarChartMonth();
  }

  createBarChartMonth() {
    this.barsMonth = new Chart(this.barChartMonth.nativeElement, {
      type: 'bar',
      data: {
        labels: this.days,
        datasets: [
          {
            label: ["Nombre d'heures par jours "],
            data: this.statisticsMonthSelected,
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

  getNbreHoursMonthSelected() {
    var firstArg = new Date(this.moi);
    var lastDayArg = new Date(
      firstArg.getFullYear(),
      firstArg.getMonth() + 1,
      0
    );
    var secondArg = -1 * Date.parse(lastDayArg.toString()) - 8.64 * 10000000;
    var a = (-1 * Date.parse(this.moi)).toString();
    var b = secondArg.toString();
    this.nbreHeuresMoi = this.activityService.getStatisticsByMonth(
      this.carteId,
      a,
      b
    );
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
