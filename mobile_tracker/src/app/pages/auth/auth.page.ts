import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ToastController } from '@ionic/angular';  // Importa ToastController

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController // Inyecta ToastController
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const response = await firstValueFrom(this.authService.login(this.loginForm.value));

        if (response && response.token) {
          sessionStorage.setItem('token', response.token);
          await this.presentToast('bottom', 'Inicio de sesión exitoso', 'toast__success');
          this.router.navigate(['/main/home']);
        } else {
          throw new Error('Respuesta de inicio de sesión no válida');
        }
      } catch (error: any) {
        console.error('Error durante el inicio de sesión:', error);
        if (error.status === 422) {
          this.errorMessage = 'Datos de entrada no válidos. Por favor verifica tu información.';
        } else if (error.status === 403 || error.status === 401) {
          this.errorMessage = 'Acceso denegado. Por favor verifica tus credenciales.';
        } else {
          this.errorMessage = 'Credenciales de inicio de sesión invalidos.';
        }
      }
    }
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

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
