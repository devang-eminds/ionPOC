import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { IonPocTableComponent } from 'src/app/shared/component/tableComponent/ion-poc-table/ion-poc-table.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DashboardPageRoutingModule],
  declarations: [DashboardPage,IonPocTableComponent],
})
export class DashboardPageModule {}
