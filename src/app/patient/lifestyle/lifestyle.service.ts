import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExerciseRoutine } from './lifestyle.model';

@Injectable({
  providedIn: 'root'
})
export class LifestyleService {
  private data: ExerciseRoutine[] = [
    { id: 1, name: 'Morning Yoga', difficulty: 'Beginner', duration: '30 mins', frequency: 'Daily', status: 'Active' },
    { id: 2, name: 'High Intensity Interval Training', difficulty: 'Advanced', duration: '45 mins', frequency: '3 times/week', status: 'Active' },
    { id: 3, name: 'Evening Walk', difficulty: 'Beginner', duration: '20 mins', frequency: 'Daily', status: 'Active' },
    { id: 4, name: 'Swimming', difficulty: 'Intermediate', duration: '60 mins', frequency: '2 times/week', status: 'Inactive' },
    { id: 5, name: 'Cycling', difficulty: 'Intermediate', duration: '40 mins', frequency: '3 times/week', status: 'Active' },
    { id: 6, name: 'Weight Lifting', difficulty: 'Advanced', duration: '50 mins', frequency: '4 times/week', status: 'Active' },
    { id: 7, name: 'Pilates', difficulty: 'Beginner', duration: '45 mins', frequency: '2 times/week', status: 'Active' },
    { id: 8, name: 'Jogging', difficulty: 'Intermediate', duration: '30 mins', frequency: 'Daily', status: 'Active' },
    { id: 9, name: 'Zumba', difficulty: 'Intermediate', duration: '60 mins', frequency: '3 times/week', status: 'Active' },
    { id: 10, name: 'Meditation', difficulty: 'Beginner', duration: '15 mins', frequency: 'Daily', status: 'Active' },
    { id: 11, name: 'Tennis', difficulty: 'Advanced', duration: '90 mins', frequency: 'Once a week', status: 'Active' },
    { id: 12, name: 'Basketball', difficulty: 'Advanced', duration: '60 mins', frequency: 'Twice a week', status: 'Inactive' },
  ];

  private dataSubject = new BehaviorSubject<ExerciseRoutine[]>(this.data);

  constructor() { }

  getAllExerciseRoutines(): Observable<ExerciseRoutine[]> {
    return this.dataSubject.asObservable();
  }

  addExerciseRoutine(routine: ExerciseRoutine): void {
    routine.id = this.data.length + 1;
    this.data.push(routine);
    this.dataSubject.next(this.data);
  }

  updateExerciseRoutine(routine: ExerciseRoutine): void {
    const index = this.data.findIndex(r => r.id === routine.id);
    if (index !== -1) {
      this.data[index] = routine;
      this.dataSubject.next(this.data);
    }
  }

  deleteExerciseRoutine(id: number): void {
    const index = this.data.findIndex(r => r.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.dataSubject.next(this.data);
    }
  }
}
