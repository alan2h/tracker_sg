import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  conductorNombre: string = '';
  dominio: string = '';
  questions: any[] = [];
  documentation_driver: boolean = false;
  documentation_vehicle: boolean = false;
  fuel_value: string = '';
  observation: string = '';

  constructor(private router: Router, private questionService: QuestionService) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        if (token) {
          this.loadQuestions(token);
        } else {
          console.error('Token no contiene la estructura esperada');
        }
      } catch (error) {
        console.error('Error al parsear el token:', error);
      }
    } else {
      console.error('No se encontró ningún token en sessionStorage');
    }
  }

  loadQuestions(token: string): void {
    this.questionService.getQuestions(token).subscribe({
      next: (response) => {
        this.questions = response.questions || [];
      },
      error: (error) => {
        console.error('Error al obtener las preguntas:', error);
      }
    });
  }

  get isFormValid(): boolean {
    return this.documentation_driver && this.documentation_vehicle && this.fuel_value !== '';
  }

  confirmar() {
    const RequisitesInitTravel = {
      documentation_driver: this.documentation_driver,
      documentation_vehicle: this.documentation_vehicle,
      fuel_value: this.fuel_value,
      observation: this.observation
    };
  
    localStorage.setItem('RequisitesInitTravel', JSON.stringify(RequisitesInitTravel));

    this.router.navigate(['/main/confirm'], { state: { data: RequisitesInitTravel } });
  }
}
