import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, switchMap } from 'rxjs';
import { Persona } from '../interfaces/Persona';
import { OperationResult } from '../interfaces/OperationResult';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://localhost:44370/personas';



  private returnOperationResult(ok: boolean, data: any): Observable<OperationResult> {
    return new Observable<OperationResult>(observer => {

      let errors: any = [];
      try {
        if (data.error && data.error.errors) {
          errors = data.error.errors;
        }
      }
      catch {
      }
      observer.next({ ok, data, errors });
      observer.complete();
    });
  }

  constructor(private http: HttpClient) { }




  add(persona: Persona): Observable<OperationResult> {
    return this.http.post<Persona>(`${this.apiUrl}`, persona)
      .pipe(
        switchMap(or => this.returnOperationResult(true, or)),
        catchError(error => this.returnOperationResult(false, error))
      );
  }



  update(persona: Persona): Observable<OperationResult> {
    return this.http.put<Persona>(`${this.apiUrl}`, persona)
      .pipe(
        switchMap(or => this.returnOperationResult(true, or)),
        catchError(error => this.returnOperationResult(false, error))
      );
  }




  remove(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }



  getAll(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.apiUrl}/`);
  }
  getById(id: string): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/${id}`);
  }


}
