import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './confirm.service';
import { QuestionService } from '../home/home.service'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  conductorNombre: string = '';
  dominio: string = '';
  nombreCliente: string = '';
  direccionCliente: string = '';
  observacionCliente: string = '';
  telefonoCliente: string = '';
  barrioCliente: string = '';
  ciudadCliente: string = '';
  isDataLoaded: boolean = false;
  isAlertOpen: boolean = false;
  alertButtons = [
    {
      text: 'OK',
      handler: () => {
        location.replace('/main/accounting')
      }
    }
  ];

  constructor(private router: Router, private dataService: DataService, public toastController: ToastController, private questionService: QuestionService) { }

  ngOnInit() {

    this.loadData();

    const token = sessionStorage.getItem('token');

    if (token) {
      this.questionService.getQuestions(token).subscribe({
        next: (response: any) => {
          console.log(response)
          if (response.length > 0) {
            this.presentToast('bottom', 'Para poder continuar, primero debes completar el formulario de inicio de viaje.', 'toast__error');
            setTimeout(() => {
              location.replace('/main/home')
            }, 3000)
          }
        },
        error: (error) => {
          console.error('Error al obtener las preguntas', error);
        }
      });
    }
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
        console.log(userData);
        this.dominio = userData.driver_data.vehicle_data.domain || "-";
        resolve();
      }, error => {
        this.presentToast("bottom", "No se pudo obtener la informacion necesaria, intentalo de nuevo mas tarde.", "toast__error");
      });
    });
  }

  public loadCustomerData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.dataService.getCustomerData().subscribe(customerData => {
        if (!customerData.name) {
          this.isAlertOpen = true;
        } else {
          const firstCustomer = customerData;
          this.nombreCliente = firstCustomer.name;
          this.direccionCliente = firstCustomer.neighborhood.name;
          this.observacionCliente = firstCustomer.neighborhood.description || '-';
          this.telefonoCliente = firstCustomer.phone || '-';
          this.barrioCliente = firstCustomer.neighborhood.name;
          this.ciudadCliente = firstCustomer.neighborhood.city.name;
        }
        resolve();
      }, error => {
        this.presentToast("bottom", "No se pudo obtener la informacion necesaria, intentalo de nuevo mas tarde.", "toast__error");
      });
    });
  }

  continuar() {
    const datosCliente = {
      nombre: this.nombreCliente,
      direccion: this.direccionCliente,
      observacion: this.observacionCliente,
      telefono: this.telefonoCliente
    };
    console.log("54" + this.telefonoCliente);
    let data = {
      "messaging_product": "whatsapp",
      "to": "543781482464",
      "type": "template",
      "template": {
        "name": "driver_iscomming",
        "language": { "code": "es_AR" }
      }
    }

    localStorage.setItem('datosCliente', JSON.stringify(datosCliente));

    const messageSent = localStorage.getItem('messageSent');

    if (!messageSent) {
      this.dataService.sendMessageWhatsapp(data).subscribe(
        () => {
          localStorage.setItem('messageSent', 'true');
          console.log('Mensaje enviado correctamente.');
          this.presentToast('bottom', 'Se ha enviado un mensaje al cliente.', 'toast__success');
          setTimeout( () =>{
            location.replace('/main/clients');
          }, 2500)
        },
        error => {
          console.error('Error al enviar el mensaje:', error);
        }
      );
    } else {
      location.replace('/main/clients');
      console.log('El mensaje ya se ha enviado anteriormente.');
    }
  }

  setOpen(isOpen: boolean): void {
    this.isAlertOpen = isOpen;
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string, cssClass: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      cssClass: cssClass
    });

    await toast.present();
  }

}
