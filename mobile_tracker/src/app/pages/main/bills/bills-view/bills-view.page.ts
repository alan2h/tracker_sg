import { Component, OnInit } from '@angular/core';
import { BillsViewService } from './bills-view.service';
import { ToastController } from '@ionic/angular';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-bills-view',
  templateUrl: './bills-view.page.html',
  styleUrls: ['./bills-view.page.scss'],
})
export class BillsViewPage implements OnInit {
  public bills: any[] = [];
  isDataLoaded: boolean = false;


  constructor(
    private billsViewService: BillsViewService,    
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.getBills();
  }

  

  getBills(){
    this.billsViewService.getBills().subscribe(
      (response) =>{
        this.bills = response;
        this.isDataLoaded = true;
        if(response.length > 0){
          this.presentToast("bottom", "Los gastos se obtuvieron correctamente", "toast__info")
        } else{
          this.presentToast("bottom", "No tiene gastos registrados", "toast__info")
        }
      },
      (error) =>{
        this.presentToast("bottom", "Ha ocurrido un error al obtener los gastos", "toast__error")
        console.log(error);
      }
    )
  }

  navigateBack(){
    this.router.navigate(['/main/bills'])
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
