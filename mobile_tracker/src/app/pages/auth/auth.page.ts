import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      pwd_user: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const response = await firstValueFrom(this.authService.login(this.loginForm.value));
        console.log(response.userData);
        localStorage.setItem('token', response.userData);
        this.router.navigate(['/main/home']);
      } catch (error: any) {
        console.error(error);
        if (error.status === 422) {
          this.errorMessage = 'Datos de entrada no válidos. Por favor verifica tu información.';
        } else if (error.status === 403 || error.status === 401) {
          this.errorMessage = 'Acceso denegado. Por favor verifica tus credenciales.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Por favor intenta nuevamente.';
        }
      }
    }
  }
}
