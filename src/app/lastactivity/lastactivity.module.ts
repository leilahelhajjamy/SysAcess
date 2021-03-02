import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LastactivityPageRoutingModule } from './lastactivity-routing.module';

import { LastactivityPage } from './lastactivity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LastactivityPageRoutingModule
  ],
  declarations: [LastactivityPage]
})
export class LastactivityPageModule {}
