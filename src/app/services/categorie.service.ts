import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Categorie } from '../models/categorie.model';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  readonly API_URL = 'http://localhost:9090/api/categories'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) {}

  getAll(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.API_URL}/findAll`).pipe(
      catchError(this.handleError)
    );
  }

  getCategorieById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.API_URL}/findById/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  saveCategorie(categorie: Categorie): Observable<any> {
    return this.http.post(`${this.API_URL}/save`, categorie).pipe(
      catchError(this.handleError)
    );
  }

  updateCategorie(categorie: Categorie): Observable<any> {
    return this.http.put(`${this.API_URL}/update`, categorie).pipe(
      catchError(this.handleError)
    );
  }

  deleteCategorie(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/delete/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.API_URL}/deleteAll`).pipe(
      catchError(this.handleError)
    );
  }

  findByName(name: string): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.API_URL}/findByName?name=${name}`).pipe(
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
