import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountingService } from './accounting.service';
import { BillsViewService } from '../bills/bills-view/bills-view.service';
import { ToastController } from '@ionic/angular';

interface Product {
  product: string;
  quantity: number;
  total: number;
  exchange: boolean;
}

interface Payment {
  date: string;
  driver: string;
  method_payment: string;
  container_10: Product[];
  container_15: Product[];
  container_45: Product[];
  load_10: Product[];
  load_15: Product[];
  load_45: Product[];
}

interface Expense {
  description: string;
  concept: {
    name: string
  }
  amount: number;
}

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.page.html',
  styleUrls: ['./accounting.page.scss'],
})
export class AccountingPage implements OnInit {
  payments: Payment[] = [];
  expenses: Expense[] = [];
  exchangeFalseProducts: { [key: string]: { [key: string]: Product[] } } = {};
  exchangeTrueProducts: { [key: string]: Product[] } = {};
  methodPayments: string[] = [];
  totalSales: number = 0;
  totalExpenses: number = 0;

  constructor(private router: Router, private accountingService: AccountingService, private billsViewService: BillsViewService, public toastController: ToastController) {}

  isDataLoaded: boolean = false;

  ngOnInit(): void {
    this.loadContabilityData();
    this.loadExpensesData();
  }

  loadContabilityData() {
    this.accountingService.getContability().subscribe(
      (data: Payment[]) => {
        this.payments = data;
        this.processSalesData();
        this.calculateTotals();
        this.isDataLoaded = true;
      },
      error => {
        this.presentToast("bottom", "No se pudo obtener la informacion necesaria, intentalo de nuevo mas tarde.", "toast__error");
        console.error('Error loading contability data', error);
      }
    );
  }

  loadExpensesData() {
    this.billsViewService.getBills().subscribe(
      (data: Expense[]) => {
        this.expenses = data;
        this.calculateTotalExpenses();
      },
      error => {
        this.presentToast("bottom", "No se pudo obtener la informacion de gastos, intentalo de nuevo más tarde.", "toast__error");
        console.error('Error loading expenses data', error);
      }
    );
  }

  processSalesData() {
    this.payments.forEach(payment => {
      const method = payment.method_payment;
      if (!this.methodPayments.includes(method)) {
        this.methodPayments.push(method);
        this.exchangeFalseProducts[method] = {};
      }

      this.groupProductsByExchange(payment.container_10, method);
      this.groupProductsByExchange(payment.container_15, method);
      this.groupProductsByExchange(payment.container_45, method);
      this.groupProductsByExchange(payment.load_10, method);
      this.groupProductsByExchange(payment.load_15, method);
      this.groupProductsByExchange(payment.load_45, method);
    });

    this.methodPayments = Array.from(new Set(this.methodPayments));
  }

  groupProductsByExchange(products: Product[], method: string) {
    products.forEach(product => {
      const key = product.product;
      if (!product.exchange) {
        if (!this.exchangeFalseProducts[method][key]) {
          this.exchangeFalseProducts[method][key] = [];
        }
        this.exchangeFalseProducts[method][key].push(product);
      } else {
        if (!this.exchangeTrueProducts[key]) {
          this.exchangeTrueProducts[key] = [];
        }
        this.exchangeTrueProducts[key].push(product);
      }
    });
  }

  calculateTotals() {
    this.methodPayments.forEach(payment => {
      let total = 0;
      this.payments.forEach(sale => {
        if (sale.method_payment === payment) {
          total += this.calculateTotalForProducts(sale.container_10);
          total += this.calculateTotalForProducts(sale.container_15);
          total += this.calculateTotalForProducts(sale.container_45);
          total += this.calculateTotalForProducts(sale.load_10);
          total += this.calculateTotalForProducts(sale.load_15);
          total += this.calculateTotalForProducts(sale.load_45);
        }
      });
      this.totalSales += total;
    });
  }

  calculateTotalForProducts(products: Product[]): number {
    return products.reduce((total, product) => {
      if (!product.exchange) {
        return total + product.total;
      } else {
        return total;
      }
    }, 0);
  }

  calculateTotalExpenses() {
    this.totalExpenses = this.expenses.reduce((total, expense) => {
      const expenseAmount = parseFloat(expense.amount.toString());
      console.log(`Adding expense: ${expenseAmount}`);
      return total + expenseAmount;
    }, 0);
  }

  getTotalOverallAmount(): number {
    return this.totalSales;
  }

getNetTotal(): number {
  console.log(this.totalSales);
  console.log(this.totalExpenses)
  return this.totalSales - this.totalExpenses;
}

  navigateBack() {
    this.router.navigate(['/main/clients']);
  }

  getExchangeFalseProducts(method: string): { [key: string]: Product[] } {
    return this.exchangeFalseProducts[method];
  }

  getExchangeTrueProducts(): { [key: string]: Product[] } {
    return this.exchangeTrueProducts;
  }

  getTotalQuantity(products: Product[]): number {
    return products.reduce((total, product) => total + product.quantity, 0);
  }

  getTotalAmount(products: Product[]): number {
    return products.reduce((total, product) => total + product.total, 0);
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
}