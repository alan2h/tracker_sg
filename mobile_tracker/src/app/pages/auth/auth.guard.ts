import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  private isActive = false; // Control para activar/desactivar el guardia

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.isActive && this.authService.isLoggedIn()) {
      return true;
    } else if (!this.isActive) {
      return true; // Permitir acceso si el guardia está desactivado
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }

  toggleGuard(active: boolean): void {
    this.isActive = active;
  }
}

