import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './confirm.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  conductorNombre: string = '';
  dominio: string = '4CJH500';
  nombreCliente: string = '';
  direccionCliente: string = '';
  observacionCliente: string = '';
  telefonoCliente: string = '';
  barrioCliente: string = '';
  ciudadCliente: string = '';
  isDataLoaded: boolean = false;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    Promise.all([this.loadUserData(), this.loadCustomerData()]).then(() => {
      this.isDataLoaded = true;
    });
  }

  loadUserData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.dataService.getUserData().subscribe(userData => {
        this.conductorNombre = userData.driver_data.name_driver;
        resolve();
      }, error => reject(error));
    });
  }

  loadCustomerData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.dataService.getCustomerData().subscribe(customerData => {
        const firstCustomer = customerData;
        this.nombreCliente = firstCustomer.name;
        this.direccionCliente = firstCustomer.neighborhood.name;
        this.observacionCliente = firstCustomer.neighborhood.description || '-';
        this.telefonoCliente = firstCustomer.phone || '-';
        this.barrioCliente = firstCustomer.neighborhood.name;
        this.ciudadCliente = firstCustomer.neighborhood.city.name;
        resolve();
      }, error => reject(error));
    });
  }

  continuar() {
    const datosCliente = {
      nombre: this.nombreCliente,
      direccion: this.direccionCliente,
      observacion: this.observacionCliente,
      telefono: this.telefonoCliente
    };

    localStorage.setItem('datosCliente', JSON.stringify(datosCliente));

    this.router.navigate(['/main/clients']);
  }

}
