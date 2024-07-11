import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { InitStockPageRoutingModule } from './init-stock-routing.module';

import { InitStockPage } from './init-stock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InitStockPageRoutingModule,
    SharedModule
  ],
  declarations: [InitStockPage]
})
export class InitStockPageModule {}
