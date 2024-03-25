
import { Injectable } from '@angular/core';
import { Redevable } from '../models/redevable.model';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RedevableService {
  
  readonly API_URL = 'http://localhost:9090/api/redevables'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) {}

  getAll(): Observable<Redevable[]> {
    return this.http.get<Redevable[]>(`${this.API_URL}/findAll`).pipe(
      catchError(this.handleError)
    );
  }

  getRedevableById(id: number): Observable<Redevable> {
    return this.http.get<Redevable>(`${this.API_URL}/findById/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  saveRedevable(categorie: Redevable): Observable<any> {
    return this.http.post(`${this.API_URL}/save`, categorie).pipe(
      catchError(this.handleError)
    );
  }

  updateRedevable(categorie: Redevable): Observable<any> {
    return this.http.put(`${this.API_URL}/update`, categorie).pipe(
      catchError(this.handleError)
    );
  }

  deleteRedevable(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/delete/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.API_URL}/deleteAll`).pipe(
      catchError(this.handleError)
    );
  }

  findByName(name: string): Observable<Redevable[]> {
    return this.http.get<Redevable[]>(`${this.API_URL}/findByName?name=${name}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

}
