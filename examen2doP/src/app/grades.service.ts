import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Grade {
  id?: string;
  firstName: string;
  lastName: string;
  matricula: string;
  email: string;
  subjects: {
    mate: number;
    oca: number;
    pmp: number;
    damm: number;
    m3d: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class GradesService {
  private gradesCollection = collection(this.firestore, 'grades');

  constructor(private firestore: Firestore) {}

  getGrades(): Observable<Grade[]> {
    return collectionData(this.gradesCollection, { idField: 'id' }) as Observable<Grade[]>;
  }

  addGrade(grade: Grade) {
    return addDoc(this.gradesCollection, grade);
  }

  updateGrade(id: string, data: Partial<Grade>) {
    const gradeDoc = doc(this.firestore, `grades/${id}`);
    return updateDoc(gradeDoc, data);
  }

  deleteGrade(id: string) {
    const gradeDoc = doc(this.firestore, `grades/${id}`);
    return deleteDoc(gradeDoc);
  }
}
