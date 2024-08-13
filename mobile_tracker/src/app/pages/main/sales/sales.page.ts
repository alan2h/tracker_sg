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
  totalPrice: number = 0;
  remainingAmount: number = 0;
  isWrongForm = false;

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
      payments: this.formBuilder.array([]),
      observations: [''],
    });
  }

  get sales() {
    return this.salesForm.get('sales') as FormArray;
  }

  get payments() {
    return this.salesForm.get('payments') as FormArray;
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

  addPayment() {
    const newPayment = this.formBuilder.group({
      method: ['', Validators.required],
      amount: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')],
      ],
    });
    this.payments.push(newPayment);
  }

  removeElemento(index: number) {
    this.sales.removeAt(index);
    this.calculateTotalPrice();
    this.calculateRemainingAmount();
  }

  removePayment(index: number) {
    this.payments.removeAt(index);
    this.calculateRemainingAmount();
  }

  onProductChange(event: any, i: number) {
    const productId = event.detail.value;
    const selectedProduct = this.products.find((p) => p.id === productId);
    if (selectedProduct) {
      this.sales.controls[i].patchValue({
        price: selectedProduct.price,
        label: selectedProduct.description,
      });
    }
  }

  calculateTotalPrice() {
    this.totalPrice = this.sales.controls
      .filter((control) => control.get('exchange')?.value === false)
      .reduce((acc, control) => {
        const quantity = control.get('quantity')?.value;
        const price = control.get('price')?.value;
        return acc + quantity * price;
      }, 0);
    this.calculateRemainingAmount();
  }

  calculateRemainingAmount() {
    const totalPaid = this.payments.controls.reduce((acc, control) => {
      const amount = control.get('amount')?.value;
      return acc + amount;
    }, 0);
    this.remainingAmount = this.totalPrice - totalPaid;
  }

  onSubmit() {
    if (this.salesForm.invalid || this.remainingAmount !== 0) {
      console.log('El formulario no es válido o aún queda un monto restante.');
      this.isWrongForm = true;
      return;
    }

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

      this.isWrongForm = false;
      this.router.navigate(['/main/detail_sale']);
    }
  }

  navigateBack() {
    this.router.navigate(['/']);
  }

  getProducts() {
    this.salesService.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.log('Error al obtener productos', error);
      }
    );
  }
}
