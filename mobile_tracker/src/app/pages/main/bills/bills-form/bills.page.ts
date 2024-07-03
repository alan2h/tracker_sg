import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillsService } from './bills.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss'],
})
export class BillsPage implements OnInit {
  billsForm!: FormGroup;
  public concepts: any[] = [];

  constructor(
    private fb: FormBuilder,
    private billsService: BillsService,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
  ) {
    this.billsForm = this.fb.group({
      conceptId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      descriptionBill: ['', Validators.required],
    });
  }

  ngOnInit() { 
    this.getConcepts();
  }

  private getConcepts() {
    this.billsService.getConcepts().subscribe(
      (response) => {
        this.concepts = response;
      },
      (error) => {
        console.error('Error al obtener conceptos:', error);
      }
    );
  }

  get formControls() {
    return this.billsForm.controls;
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres enviar la factura?',
      buttons: [
        {
          text: 'Volver',
          role: 'cancel',
          handler: () => {
            console.log('Confirmar cancelado');
          }
        },
        {
          text: 'Enviar',
          handler: () => {
            this.submitBill();
          }
        }
      ]
    });
    await alert.present();
  }

  createBill() {
    if (this.billsForm.valid) {
      this.showAlert();
    } else {
      this.markFormGroupTouched(this.billsForm);
      console.log('Formulario inválido');
    }
  }

  private submitBill() {
    this.billsService.submitBill(this.billsForm.value).subscribe(
      (response) => {
        if(response){
          this.billsForm.reset({ conceptId: '', amount: '', descriptionBill: '' });
          this.presentToast("bottom", "La factura se genero correctamente", "toast__success");
        }
      },
      (error) => {
        this.presentToast("bottom", "Error al generar la factura", "toast__error");
        console.error('Error al crear factura:', error);
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

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as FormGroup).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }


  redirectToMyBills(){
    this.router.navigate(['/main/mybills'])
  }
}
