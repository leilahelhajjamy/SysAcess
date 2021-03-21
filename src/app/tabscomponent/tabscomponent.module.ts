import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabscomponentPageRoutingModule } from './tabscomponent-routing.module';

import { TabscomponentPage } from './tabscomponent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabscomponentPageRoutingModule
  ],
  exports: [TabscomponentPage],
  declarations: [TabscomponentPage]
})
 
export class TabscomponentPageModule {}
