import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  conductorNombre: string = 'Alan Beck'; // Suponiendo que estos datos se obtienen de alguna fuente
  dominio: string = '4CJH500';
  nombreCliente: string = 'Pedro Escamoso';
  direccionCliente: string = 'Miguel gutierrez 1225 barrio vial';
  nroCasaCliente: string = '1225';
  manzanaCliente: string = '-';
  observacionCliente: string = 'Tiene un perro grande';
  telefonoCliente: string = '3781482464';

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Aquí podrías implementar la lógica para obtener datos del cliente si es necesario
  }

  continuar() {
    const datosCliente = {
      nombre: this.nombreCliente,
      direccion: this.direccionCliente,
      nroCasa: this.nroCasaCliente,
      manzana: this.manzanaCliente,
      observacion: this.observacionCliente,
      telefono: this.telefonoCliente
    };

    localStorage.setItem('datosCliente', JSON.stringify(datosCliente));

    this.router.navigate(['/main/clients']);
  }

  volver() {
    console.log(localStorage.getItem('datosCliente'));
    this.router.navigate(['/main/home']);
    localStorage.removeItem('datosCliente');
  }
}
