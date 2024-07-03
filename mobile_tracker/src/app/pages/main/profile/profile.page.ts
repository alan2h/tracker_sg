import { Component, OnInit } from '@angular/core';
import { UserService } from '../main.service'; // Asegúrate de actualizar esta ruta
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  driverData: any = {};
  isDataLoaded = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.loadUserData();
    } else {
      console.error('No se encontró ningún token en sessionStorage');
    }
  }

  loadUserData(): void {
    this.userService.getUserData().subscribe({
      next: (data) => {
        this.driverData = data.driver_data;
        this.isDataLoaded = true;
      },
      error: (error) => {
        console.error('Error al obtener los datos del conductor:', error);
      }
    });
  }

  logout(): void{
    sessionStorage.removeItem('token');
    location.replace('/auth');
  }
}
