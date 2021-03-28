import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivityService } from '../services/activity.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-statistic-annee-modal',
  templateUrl: './statistic-annee-modal.page.html',
  styleUrls: ['../app.component.scss'],
})
export class StatisticAnneeModalPage implements OnInit {
  @Input() annee: string;
  @Input() carteId: string;
  @ViewChild('barChart', { static: true }) barChart;

  statisticsYear = [];
  NbreHeuresAnnee = 0;
  barsCurrent: any;
  months = [];
  nowYear;
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
  MoyenneMois = 0;
  MoyenneSemaine = 0;
  constructor(
    private activityService: ActivityService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    console.log('annee parametere', this.annee);
    this.getCurrentYearStatistics();
    this.NbreHeureAnnee();
    this.moyenneHeures();
    // this.getNbreHoursMonthSelected();
  }

  ionViewDidEnter() {
    this.createBarChart();
  }

  getCurrentYearStatistics() {
    for (let i = 1; i <= 12; i++) {
      var month = (
        -1 * Date.parse(this.annee + '-0' + i.toString())
      ).toString();
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
  NbreHeureAnnee() {
    this.statisticsYear.forEach((elt) => {
      console.log(elt);
      this.NbreHeuresAnnee += elt;
    });
  }

  moyenneHeures() {
    this.MoyenneMois = Math.ceil(this.NbreHeuresAnnee / 12);
    this.MoyenneSemaine = Math.ceil(this.NbreHeuresAnnee / (12 * 4.35));
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

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
