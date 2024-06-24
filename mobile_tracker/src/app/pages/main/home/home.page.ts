import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { QuestionService } from './home.service';
import { UserService } from '../main.service'; // Asegúrate de actualizar esta ruta

interface Question {
  id: number;
  description: string;
}

interface Answer {
  id: number;
  check: boolean | number;
  comentario: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  conductorNombre: string = '';
  dominio: string = '-';
  questions: Question[] = [];
  answers: { [key: number]: Answer } = {};
  isDataLoaded: boolean = false;
  isAlertOpen: boolean = false;
  alertButtons = [
    {
      text: 'OK',
      handler: () => {
        location.replace('/main/confirm')
      }
    }
  ];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private questionService: QuestionService,
    private userService: UserService
  ) {}


  ngOnInit(): void {
    const hasReloaded = sessionStorage.getItem('hasReloaded');
    if (!hasReloaded) {
      sessionStorage.setItem('hasReloaded', 'true');
      location.reload();
    } else {
      sessionStorage.removeItem('hasReloaded');
      this.initializeComponent();
    }
  }

  initializeComponent(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        this.loadUserData();
        this.loadQuestions(token);
      } catch (error) {
        console.error('Error al parsear el token:', error);
      }
    } else {
      console.error('No se encontró ningún token en sessionStorage');
    }
  }
  
  loadQuestions(token: string): void {
    this.questionService.getQuestions(token).subscribe({
      next: (response: Question[]) => {
        if (response.length === 0) {
          this.isAlertOpen = true;
        } else {
          this.questions = response;
          this.initializeAnswers();
        }
        this.checkDataLoaded();
      },
      error: (error) => {
        console.error('Error al obtener las preguntas:', error);
        this.checkDataLoaded();
      }
    });
  }

  loadUserData(): void {
    this.userService.getUserData().subscribe({
      next: (data) => {
        this.conductorNombre = data.driver_data.name_driver;
        this.checkDataLoaded();
      },
      error: (error) => {
        console.error('Error al obtener los datos del conductor:', error);
        this.checkDataLoaded();
      }
    });
  }

  initializeAnswers(): void {
    this.questions.forEach(question => {
      this.answers[question.id] = {
        id: question.id,
        check: false,
        comentario: ''
      };
    });
  }

  checkDataLoaded(): void {
    if (this.questions.length > 0 && this.conductorNombre) {
      this.isDataLoaded = true;
    }
  }

  async presentAlert(questionId: number) {
    const alert = await this.alertController.create({
      header: 'Comentario',
      inputs: [
        {
          name: 'comentario',
          type: 'text',
          placeholder: 'Ingrese un comentario',
          value: this.answers[questionId]?.comentario || ''
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Comentario cancelado');
          }
        }, {
          text: 'Guardar',
          handler: (data) => {
            if (this.answers[questionId]) {
              this.answers[questionId].comentario = data.comentario;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmar() {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado en sessionStorage');
      return;
    }

    try {
      for (const questionId in this.answers) {
        if (this.answers.hasOwnProperty(questionId)) {
          const answer = this.answers[questionId];

          if (questionId === '3') {
            const selectedValue = this.answers[questionId].check;
            if (selectedValue !== undefined) {
              this.answers[questionId].comentario = `${selectedValue}%`;
            }
          }

          const formData = new FormData();
          formData.append('question', answer.id.toString());
          formData.append('string', answer.comentario);
          formData.append('boolean', answer.check ? 'true' : 'false');

          await this.questionService.sendAnswer(token, formData).toPromise();
        }
      }

      const RequisitesInitTravel = {
        answers: this.answers,
      };
      localStorage.setItem('RequisitesInitTravel', JSON.stringify(RequisitesInitTravel));
      this.router.navigate(['/main/confirm']);
    } catch (error) {
      console.error('Error al enviar respuestas:', error);
    }
  }

  setOpen(isOpen: boolean): void {
    this.isAlertOpen = isOpen;
  }
}
