import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.page.html',
  styleUrls: ['./accounting.page.scss'],
})
export class AccountingPage implements OnInit {
  accountingForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.accountingForm = this.fb.group({
      transactions: this.fb.array([]),
      observations: ['']
    });

    this.addTransaction('Efectivo');
    this.addTransaction('Mercado Pago');
    this.addTransaction('Cheque');

    // Intentar recuperar el formulario desde localStorage si existe
    const accountingFormData = localStorage.getItem('accountingFormData');
    if (accountingFormData) {
      const parsedData = JSON.parse(accountingFormData);
      this.accountingForm.patchValue(parsedData);
      parsedData.transactions.forEach((transaction: any, index: number) => {
        this.transactions.at(index).patchValue(transaction);
      });
    }
  }

  ngOnInit() { }

  get transactions(): FormArray {
    return this.accountingForm.get('transactions') as FormArray;
  }

  addTransaction(label: string) {
    const newTransaction = this.fb.group({
      label: [label],
      value: ['', Validators.required]
    });

    this.transactions.push(newTransaction);
  }

  onSubmit() {
    if (this.accountingForm.valid) {
      localStorage.setItem('accountingFormData', JSON.stringify(this.accountingForm.value));
      // Lógica para hacer la petición a la API
    } else {
      console.log('Formulario no válido');
    }
  }

  navigateBack() {
    this.router.navigate(['/main/clients']);
  }
}
