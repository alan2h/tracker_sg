import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  salesForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.salesForm = this.fb.group({
      sales: this.fb.array([]),
      paymentMethod: ['', Validators.required],
      observations: ['']
    });

    this.addSale('Carga de 10 kg');
    this.addSale('Carga de 15 kg');
    this.addSale('Carga de 45 kg');
    this.addSale('Envase de 10 kg');
    this.addSale('Envase de 15 kg');
    this.addSale('Envase de 45 kg');

    // Intentar recuperar el formulario desde localStorage si existe
    const salesFormData = localStorage.getItem('salesFormData');
    if (salesFormData) {
      this.salesForm.patchValue(JSON.parse(salesFormData));
    }
  }

  ngOnInit() { }

  get sales(): FormArray {
    return this.salesForm.get('sales') as FormArray;
  }

  addSale(label: string) {
    const newSale = this.fb.group({
      label: [label],
      value: ['', Validators.required],
      isChange: [false]
    });

    this.sales.push(newSale);
  }

  onSubmit() {
    if (this.salesForm.valid) {
      localStorage.setItem('salesFormData', JSON.stringify(this.salesForm.value));
      

      this.router.navigate(['/main/detail_sale']);
    } else {
      console.log('Formulario no válido');
    }
  }

  toggleIsChange(index: number) {
    const sale = this.sales.at(index);
    if (sale) {
      const currentValue = sale.get('isChange')?.value;
      sale.get('isChange')?.setValue(!currentValue);
    }
  }

  navigateBack(){
    this.router.navigate(['/main/clients']);
  }
}
