import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  private isActive = true;

  constructor(private authService: AuthService, private router: Router, public toastController: ToastController) {}

  canActivate(): boolean {
    if (this.isActive && this.authService.isLoggedIn()) {
      return true;
    } else if (!this.isActive) {
      return true;
    } else {
    this.presentToast('bottom', 'Para poder navegar en la aplicación primero debe iniciar sesión.', 'toast__error');
      this.router.navigate(['/auth']);
      return false;
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

  toggleGuard(active: boolean): void {
    this.isActive = active;
  }
}

