import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GradesService, Grade } from '../grades.service'; 
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  grades$: Observable<Grade[]> = new Observable();
  editingGradeId: string | null = null; 
  gradeData: Grade = {
    firstName: '',
    lastName: '',
    matricula: '',
    email: '',
    subjects: {
      mate: 0,
      oca: 0,
      pmp: 0,
      damm: 0,
      m3d: 0,
    }
  };

  constructor(private gradesService: GradesService, private authService: AuthService, private router: Router) {} 

  ngOnInit() {
    this.grades$ = this.gradesService.getGrades();
  }

  addGrade() {
    if (this.gradeData.firstName.trim() && this.gradeData.matricula.trim()) {
      if (this.editingGradeId) {
        this.gradesService.updateGrade(this.editingGradeId, this.gradeData).then(() => {
          this.editingGradeId = null; 
          this.resetForm();
        });
      } else {
        this.gradesService.addGrade(this.gradeData).then(() => {
          this.resetForm();
        });
      }
    }
  }

  editGrade(grade: Grade) {
    this.gradeData = { ...grade };
    this.editingGradeId = grade.id || null;
  }

  deleteGrade(gradeId: string) {
    this.gradesService.deleteGrade(gradeId);
  }

  resetForm() {
    this.gradeData = {
      firstName: '',
      lastName: '',
      matricula: '',
      email: '',
      subjects: {
      mate: 0,
      oca: 0,
      pmp: 0,
      damm: 0,
      m3d: 0,
      }
    };
  }

  async logout() {
    try {
      await this.authService.logout();
      alert('Sesión cerrada exitosamente');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
