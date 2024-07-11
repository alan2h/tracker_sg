import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitStockPage } from './init-stock.page';

const routes: Routes = [
  {
    path: '',
    component: InitStockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitStockPageRoutingModule {}
