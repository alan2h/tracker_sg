import { Component, OnInit } from '@angular/core';
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
export class DetailSalePage implements OnInit {
  salesHistory: Sale[] = []; // Definir la estructura de datos para las ventas
  errorMessage: string | null = null;

  constructor(private router: Router) { }

  ngOnInit() {
    // Obtener el estado anterior almacenado en localStorage
    const salesFormData = localStorage.getItem('salesFormData');
    if (salesFormData) {
      const salesForm = JSON.parse(salesFormData) as { sales: Sale[] };
      this.salesHistory = salesForm.sales.filter((sale: Sale) => sale.value > 0); // Filtrar ventas con valor mayor a 0
    } else {
      this.errorMessage = 'No se encontraron datos de historial en localStorage';
      console.error(this.errorMessage);
    }
  }

  submit(){
    // LOGICA PARA HACER LA PETICION A LA API
    // y mandar a /clients

    console.log('hola');
  }

  navigateBack() {
    this.router.navigate(['/main/sales']);
  }
}
