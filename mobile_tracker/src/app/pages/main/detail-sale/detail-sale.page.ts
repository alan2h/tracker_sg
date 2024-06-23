import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Sale {
  label: string;
  value: number;
  isChange: boolean;
}

@Component({
  selector: 'app-detail-sale',
  templateUrl: './detail-sale.page.html',
  styleUrls: ['./detail-sale.page.scss'],
})
export class DetailSalePage {
  salesHistory: Sale[] = [];
  errorMessage: string | null = null;

  constructor(private router: Router) { }

  ionViewWillEnter() {
    const salesFormData = localStorage.getItem('salesFormData');
    if (salesFormData) {
      const salesForm = JSON.parse(salesFormData) as { sales: Sale[] };
      this.salesHistory = salesForm.sales.filter((sale: Sale) => sale.value > 0);
    } else {
      this.errorMessage = 'No se encontraron datos de historial en localStorage';
      console.error(this.errorMessage);
    }
  }

  submit() {
    // LOGICA PARA HACER LA PETICION A LA API
    // y mandar a /clients

    this.salesHistory = [];
    // Navegar a la página de clientes
    this.router.navigate(['main/clients']);
  }

  navigateBack() {
    this.router.navigate(['/main/sales']);
  }
}
