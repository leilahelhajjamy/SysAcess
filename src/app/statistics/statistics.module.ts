import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabscomponentPageModule } from '../tabscomponent/tabscomponent.module';
import { IonicModule } from '@ionic/angular';

import { StatisticsPageRoutingModule } from './statistics-routing.module';

import { StatisticsPage } from './statistics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticsPageRoutingModule,
   
    ReactiveFormsModule,
    TabscomponentPageModule
  ],
  declarations: [StatisticsPage]
})
export class StatisticsPageModule {}
