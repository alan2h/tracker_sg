import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SalesService } from './sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  salesForm: FormGroup;
  products: any[] = [];
  datosCliente: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private salesService: SalesService
  ) {
    this.salesForm = this.fb.group({
      sales: this.fb.array([]),
      paymentMethod: ['', Validators.required],
      observations: ['']
    });

    const salesFormData = localStorage.getItem('salesFormData');
    if (salesFormData) {
      this.salesForm.patchValue(JSON.parse(salesFormData));
    }

    const datosClienteString = localStorage.getItem('datosCliente');
    if (datosClienteString) {
      this.datosCliente = JSON.parse(datosClienteString);
    }
  }

  ngOnInit() {
    this.getProducts();
  }

  get sales(): FormArray {
    return this.salesForm.get('sales') as FormArray;
  }

  addSale(product: any) {
    const newSale = this.fb.group({
      id: [product.id],
      label: [`${product.description} (${product.size.number_size} kg)`],
      quantity: ['', Validators.required],
      price: [product.price],
      isChange: [false]
    });

    this.sales.push(newSale);
  }

  onSubmit() {
    if (this.salesForm.valid) {
      const detailSale = this.sales.value.map((sale: any) => ({
        product: sale.id,
        quantity: sale.quantity
      }));
      localStorage.setItem('salesFormData', JSON.stringify(this.salesForm.value));
      localStorage.setItem('detail_sale', JSON.stringify(detailSale));

      this.router.navigate(['/main/detail_sale']);
    } else {
      console.log('Formulario no válido');
    }
  }

  navigateBack(){
    this.router.navigate(['/main/clients']);
  }

  private getProducts() {
    this.salesService.getProducts().subscribe(
      (response) => {
        this.products = response;
        this.products.forEach((product) => this.addSale(product));
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }
}
