import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Terrain } from '../models/terrain.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {
  
 readonly API_URL = 'http://localhost:9090/api/terrains'; 
  //readonly API_URL = 'http://localhost:2020/api/search'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) {}

  

  getAll(): Observable<Terrain[]> {
    return this.http.get<Terrain[]>(`${this.API_URL}/findAll`).pipe(
      catchError(this.handleError)
    );
  }

  getTerrainById(id: number): Observable<Terrain> {
    return this.http.get<Terrain>(`${this.API_URL}/findById/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  saveTerrain(terrain: Terrain): Observable<any> {
    return this.http.post(`${this.API_URL}/save`, terrain).pipe(
      catchError(this.handleError)
    );
  }

  updateTerrain(terrain: Terrain): Observable<any> {
    return this.http.put(`${this.API_URL}/update`, terrain).pipe(
      catchError(this.handleError)
    );
  }

  deleteTerrain(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/delete/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.API_URL}/deleteAll`).pipe(
      catchError(this.handleError)
    );
  }

  findByName(name: string): Observable<Terrain[]> {
    return this.http.get<Terrain[]>(`${this.API_URL}/findByName?name=${name}`).pipe(
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
