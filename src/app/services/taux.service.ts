import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Taux } from '../models/taux.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TauxService {
  
  readonly API_URL = 'http://localhost:9090/api/tauxs'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) {}

  getAll(): Observable<Taux[]> {
    return this.http.get<Taux[]>(`${this.API_URL}/findAll`).pipe(
      catchError(this.handleError)
    );
  }

  getTauxById(id: number): Observable<Taux> {
    return this.http.get<Taux>(`${this.API_URL}/findById/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  saveTaux(taux: Taux): Observable<any> {
    return this.http.post(`${this.API_URL}/save`, taux).pipe(
      catchError(this.handleError)
    );
  }

  updateTaux(taux: Taux): Observable<any> {
    return this.http.put(`${this.API_URL}/update`, taux).pipe(
      catchError(this.handleError)
    );
  }

  deleteTaux(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/delete/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.API_URL}/deleteAll`).pipe(
      catchError(this.handleError)
    );
  }

  findByName(name: string): Observable<Taux[]> {
    return this.http.get<Taux[]>(`${this.API_URL}/findByName?name=${name}`).pipe(
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