import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './main.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  router = inject(Router);
  currentPath: string = '';
  userData: any = null;

  pages = [
    {
      title: 'Cuestionario',
      url: '/main/home',
      icon: 'clipboard-outline'
    },
    {
      title: 'Clientes',
      url: '/main/confirm',
      icon: 'people-outline'
    },
    {
      title: 'Gastos',
      url: '/main/bills',
      icon: 'document-outline'
    },
    {
      title: "Rendición",
      url: "/main/accounting",
      icon: "document-text-outline"
    },
    {
      title: 'Mensajes',
      url: '/main/messages',
      icon: 'paper-plane-outline'
    },
    {
      title: 'Perfil',
      url: '/main/profile',
      icon: 'person-outline'
    },
  ];

  constructor(private userService: UserService, public toastController: ToastController) { }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event?.url) this.currentPath = event.url;
    });

    this.userService.getUserData().subscribe(
      (data) => {
        this.userData = data.users_data;
      },
      (error) => {
      this.presentToast("bottom", "Ha ocurrido un error al obtener los datos del usuario, intentelo de nuevo mas tarde.", "toast__error");
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
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

  redirect(url: string) {
    location.replace(url);
  }
}
