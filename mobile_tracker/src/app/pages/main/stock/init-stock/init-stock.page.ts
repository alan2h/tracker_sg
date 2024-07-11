import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { InitStockService } from './init-stock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-init-stock',
  templateUrl: './init-stock.page.html',
  styleUrls: ['./init-stock.page.scss'],
})
export class InitStockPage {

  stockForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private initStockService: InitStockService,
    private toastController: ToastController,
    private router: Router
  ) {
    this.stockForm = this.formBuilder.group({
      quantity: ['', Validators.required]
    });
  }

  async submitForm() {
    if (this.stockForm.valid) {
      const formData = this.stockForm.value;
      try {
        await this.initStockService.submitStock(formData).toPromise();
        this.presentToast('bottom', 'Cantidad guardada correctamente', 'toast__success');
        location.replace('/main/confirm');
      } catch (error) {
        console.error('Error al guardar la cantidad:', error);
        this.presentToast('bottom', 'Ha ocurrido un error al guardar la cantidad, inténtelo nuevamente', 'toast__error');
      }
    } else {
      this.presentToast('bottom', 'Por favor complete todos los campos correctamente', 'toast__error');
    }
  }

  isFieldInvalid(field: string) {
    const control = this.stockForm.get(field);
    return control ? control.invalid && control.touched : false;
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string, cssClass: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: position,
      cssClass: cssClass
    });
    toast.present();
  }
}
