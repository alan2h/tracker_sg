import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailSalePageRoutingModule } from './detail-sale-routing.module';

import { DetailSalePage } from './detail-sale.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailSalePageRoutingModule
  ],
  declarations: [DetailSalePage]
})
export class DetailSalePageModule {}
