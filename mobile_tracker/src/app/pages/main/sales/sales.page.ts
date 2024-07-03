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
  products: any[] = [];
  datosCliente: any;
  salesForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private salesService: SalesService
  ) {
    const datosClienteString = localStorage.getItem('datosCliente');
    if (datosClienteString) {
      this.datosCliente = JSON.parse(datosClienteString);
    }
  }

  addElemento() {
    const newSale = this.formBuilder.group({
      product: ['', Validators.required],
      label: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      price: [''],
      exchange: [false],
    });
    this.sales.push(newSale);
  }

  ngOnInit() {
    this.getProducts();
    this.salesForm = this.formBuilder.group({
      cliente: this.formBuilder.group({
        nombre: [this.datosCliente.nombre],
        telefono: [this.datosCliente.telefono],
        direccion: [this.datosCliente.direccion],
        observacion: [this.datosCliente.observacion],
      }),
      sales: this.formBuilder.array([]),
      paymentMethod: ['', Validators.required], // Validador de campo requerido
      observations: [''],
    });
  }

  get sales() {
    return this.salesForm.get('sales') as FormArray;
  }

  removeElemento(index: number) {
    this.sales.removeAt(index);
  }

  onSubmit() {
    if (this.salesForm.valid) {
      const listProducts = this.salesForm.value.sales.map((sale: any) => ({ ...sale }));
      const detailSale = this.salesForm.value.sales.map((sale: any) => ({
        product: sale.product,
        quantity: sale.quantity,
        exchange: sale.exchange
      }));

      localStorage.setItem('productData', JSON.stringify(listProducts));
      localStorage.setItem('salesFormData', JSON.stringify(this.salesForm.value));
      localStorage.setItem('detail_sale', JSON.stringify(detailSale));

      this.router.navigate(['/main/detail_sale']);
    } else {
      this.markFormGroupTouched(this.salesForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  navigateBack() {
    this.router.navigate(['/main/clients']);
  }

  private getProducts() {
    this.salesService.getProducts().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  onProductChange(event: any, index: number) {
    const selectedProductId = event.detail.value;
    const selectedProduct = this.products.find(product => product.id === selectedProductId);
    if (selectedProduct) {
      this.sales.at(index).patchValue({
        price: selectedProduct.price,
        label: selectedProduct.description
      });
    }
  }
}
