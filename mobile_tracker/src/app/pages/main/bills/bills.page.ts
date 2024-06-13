import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { min } from 'rxjs';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss'],
})

// DEFINICION DE ARRAY
export class BillsPage implements OnInit {
  dateTimeVisible: boolean = false;
  billsForm: FormGroup;
  billsList: any[] = [{
    date: "10/06/2024",
    concept: "Rueda Pinchada",
    amount: 200,
    numberFacture: "12341"
  }];

  // IMPORT FORMBUILDER Y ALERTCONTROLLER
  constructor(private fb: FormBuilder, private alertController: AlertController) {
    this.billsForm = this.fb.group({
      date: ['', Validators.required],
      concept: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      numberFacture: ['', Validators.required],
    });
  }

  ngOnInit() { }

  // MODAL FECHA
  showDateTime() {
    this.dateTimeVisible = !this.dateTimeVisible;
  }


  createBill() {
    if (this.billsForm.valid) {
      this.billsList.push(this.billsForm.value);
      console.log(this.billsList);
      this.billsForm.reset();
      this.dateTimeVisible = false;
    } else {
      console.log('Formulario inválido');
    }
  }


  // DISPARADOR DEL MODAL
  editBill(bill: any) {
    this.presentEditAlert(bill);
  }

  // ARRAYS PARA DEFINIR LOS INPUTS, Y SUS TYPES
  public alertInputs = [
    {
      name: "date",
      placeholder: 'Fecha',
      type: "date",
    },
    {
      name: "concept",
      placeholder: 'Concepto',
    },
    {
      name: "amount",
      type: 'number',
      placeholder: 'Monto'
    },
    {
      name: "numberFacture",
      type: "text",
      placeholder: 'Nro. de comprobante',
    },
  ];

  // CREAR EL MODAL DE EDITAR
  async presentEditAlert(bill: any) {
    // ASIGNAR A LOS INPUTS DEL MODAL LOS VALORES DEL BILL A EDITAR
    const alertInputsWithValues: any = this.alertInputs.map(input => ({
      ...input,
      value: bill[input.name] || null
    }));

    const alert = await this.alertController.create({
      header: 'Editar Gasto',
      message: 'Por favor, introduce la nueva información.',
      inputs: alertInputsWithValues,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Edición cancelada');
          }
        }, {
          text: 'Guardar',
          handler: (data) => {
            console.log('Información ingresada:', data);
            const index = this.billsList.findIndex(item => item.id === bill.id);
            if (index !== -1) {
              this.billsList[index] = {
                ...this.billsList[index],
                ...data
              };
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // ELIMINAR BILL
  deleteBill(bill:any){
    const index = this.billsList.findIndex(item => item.id === bill.id);
    if (index !== -1) {
      this.billsList.splice(index, 1);
    }
    console.log('Lista actualizada:', this.billsList);
  }


 
}
