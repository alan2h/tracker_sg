import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './main.service'; // Asegúrate de actualizar esta ruta

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
      title: 'Inicio',
      url: '/main/home',
      icon: 'home-outline'
    },
    {
      title: 'Gastos',
      url: '/main/bills',
      icon: 'document-outline'
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

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event?.url) this.currentPath = event.url;
    });

    this.userService.getUserData().subscribe(
      (data) => {
        this.userData = data.users_data;
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }
}
