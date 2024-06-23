import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountingPageRoutingModule } from './accounting-routing.module';

import { AccountingPage } from './accounting.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountingPageRoutingModule,
    SharedModule
  ],
  declarations: [AccountingPage]
})
export class AccountingPageModule {}
