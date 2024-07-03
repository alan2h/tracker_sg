import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from './detail-sale.service';
import { ToastController } from '@ionic/angular';
interface Sale {
  id: number;
  label: string;
  quantity: number;
  exchange: boolean;
  price: number;
}

interface SaleItem {
  product: number;
  quantity: number;
  exchange: boolean;
}

@Component({
  selector: 'app-detail-sale',
  templateUrl: './detail-sale.page.html',
  styleUrls: ['./detail-sale.page.scss'],
})
export class DetailSalePage {
  salesHistory: Sale[] = [];
  nonExchangeSales: Sale[] = [];
  exchangeSales: Sale[] = [];
  errorMessage: string | null = null;
  totalNonExchangeSales: number = 0;

  constructor(private router: Router, private salesService: SalesService, public toastController: ToastController) {}

  ionViewWillEnter() {
    const salesFormData = JSON.parse(localStorage.getItem('salesFormData') || '{}');
    if (salesFormData.sales) {
      this.salesHistory = salesFormData.sales.filter((sale: Sale) => sale.quantity > 0);
      this.separateSales();
      this.calculateTotal();
    } else {

    }
  }

  separateSales() {
    this.nonExchangeSales = this.salesHistory.filter(sale => !sale.exchange);
    this.exchangeSales = this.salesHistory.filter(sale => sale.exchange);
  }

  calculateTotal() {
    this.totalNonExchangeSales = this.nonExchangeSales.reduce((total, sale) => total + (sale.price * sale.quantity), 0);
  }

  submit() {
    const customerId = localStorage.getItem('customer_id');
    const formSaleData = JSON.parse(localStorage.getItem('salesFormData') || '[]');
    const detailSaleInLocalStorage: SaleItem[] = JSON.parse(localStorage.getItem('detail_sale') || '[]');
    const detailSale: SaleItem[] = detailSaleInLocalStorage.filter(item => item.quantity > 0);

    const paymentMethod = formSaleData.paymentMethod;

    if(this.totalNonExchangeSales === 0 && detailSale.length < 1){
      this.salesService.submitSale(parseInt(customerId!),"CANCELADO", paymentMethod, detailSale, this.totalNonExchangeSales).subscribe(
        (response) => {
          this.presentToast("bottom", "La venta ha sido cancelada, redirigiendo al siguiente cliente.", "toast__success");
          localStorage.removeItem('salesFormData');
          localStorage.removeItem('detail_sale');
          setTimeout( () =>{
            location.replace('/main/confirm');
          },3000)
        },
        (error) => {
          console.error('Error al realizar la venta', error);
          this.presentToast("bottom", "No se pudo realizar la venta, intentelo de nuevo mas tarde.", "toast__error");
        }
      );
      return
    }

    if (customerId && paymentMethod && detailSale.length > 0) {
      this.salesService.submitSale(parseInt(customerId),"PAGADO", paymentMethod, detailSale, this.totalNonExchangeSales).subscribe(
        (response) => {
          this.presentToast("bottom", "La venta ha sido guardada, redirigiendo al siguiente cliente.", "toast__success");
          localStorage.removeItem('salesFormData');
          localStorage.removeItem('detail_sale');
          setTimeout( () =>{
            location.replace('/main/confirm');
          },3000)
        },
        (error) => {
          console.error('Error al realizar la venta', error);
        }
      );
    } else {
      console.error('No se encontraron datos suficientes para realizar la venta.');
      this.presentToast("bottom", "No se pudo realizar la venta, intentelo de nuevo mas tarde.", "toast__error");
    }

    return;
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

  navigateBack() {
    this.router.navigate(['/main/sales']);
    localStorage.removeItem('salesFormData');
    localStorage.removeItem('detail_sale');
  }
}
