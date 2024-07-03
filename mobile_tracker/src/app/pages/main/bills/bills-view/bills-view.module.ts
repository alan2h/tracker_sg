import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BillsViewPageRoutingModule } from './bills-view-routing.module';
import { BillsViewPage } from './bills-view.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillsViewPageRoutingModule,
    SharedModule
  ],
  declarations: [BillsViewPage]
})
export class BillsViewPageModule {}
