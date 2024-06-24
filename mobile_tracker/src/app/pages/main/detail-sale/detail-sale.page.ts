// src/app/pages/detail-sale/detail-sale.page.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from './detail-sale.service';

interface Sale {
  id: number;
  label: string;
  quantity: number;
  price: string;
}

interface SaleItem {
  product: number;
  quantity: number;
}

@Component({
  selector: 'app-detail-sale',
  templateUrl: './detail-sale.page.html',
  styleUrls: ['./detail-sale.page.scss'],
})
export class DetailSalePage {
  salesHistory: Sale[] = [];
  errorMessage: string | null = null;

  constructor(private router: Router, private salesService: SalesService) {}

  ionViewWillEnter() {
    const salesFormData = JSON.parse(localStorage.getItem('salesFormData') || '{}');
    if (salesFormData.sales) {
      this.salesHistory = salesFormData.sales.filter((sale: Sale) => sale.quantity > 0);
    } else {
      this.errorMessage = 'No se encontraron datos de historial en localStorage';
      console.error(this.errorMessage);
    }
  }

  submit() {
    const customerId = localStorage.getItem('customer_id');
    const formSaleData = JSON.parse(localStorage.getItem('salesFormData') || '[]');
    const detailSaleInLocalStorage: SaleItem[] =  JSON.parse(localStorage.getItem('detail_sale') || '[]');
    const detailSale : SaleItem[] =  detailSaleInLocalStorage.filter(item => item.quantity > 0);

    const paymentMethod = formSaleData.paymentMethod;

    if (customerId && paymentMethod && detailSale.length > 0) {
      this.salesService.submitSale(parseInt(customerId), paymentMethod, detailSale).subscribe(
        (response) => {
          console.log('Venta realizada exitosamente', response);
          localStorage.removeItem('salesFormData');
          localStorage.removeItem('detail_sale');
          this.router.navigate(['/main/clients']);
        },
        (error) => {
          console.error('Error al realizar la venta', error);
        }
      );
    } else {
      console.error('No se encontraron datos suficientes para realizar la venta');
    }
  }

  navigateBack() {
    this.router.navigate(['/main/sales']);
  }
}
