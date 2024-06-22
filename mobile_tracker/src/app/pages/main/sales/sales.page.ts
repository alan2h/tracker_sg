import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  salesForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
      console.log(this.salesForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }

  toggleIsChange(index: number) {
    console.log('Index:', index);
    const sale = this.sales.at(index);
    console.log('Sale:', sale?.value);
    if (sale) {
      const currentValue = sale.get('isChange')?.value;
      console.log('Current Value:', currentValue);
      sale.get('isChange')?.setValue(!currentValue);
      console.log('New Value:', sale.get('isChange')?.value);
    }
  }
  
}
