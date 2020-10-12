import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Servico } from './servico.model';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  readonly API = 'http://127.0.0.1:8080';
  private subjServico$: BehaviorSubject<Servico> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  getServicos(){
    return this.http.get<Servico[]>(`${this.API}/servicos`)
    .pipe(
      tap(console.log)
    )
      
  }
  create(servico: Servico): Observable<Servico> {
    return this.http.post<Servico>(`${this.API}/servicos`, servico)
  }

  getById(_id:String): Observable<Servico> {
    return this.http.get<Servico>(`${this.API}/servicos/${_id}`).pipe(
      tap((s: Servico) => {
        this.subjServico$.next(s);
      })
    )
  }
  update(servico:Servico): Observable<Servico> {
    return this.http.put<Servico>(`${this.API}/servicos/${servico._id}`, servico)
  }
  delete(servico:Servico): Observable<Object> {
    return this.http.delete(`${this.API}/servicos/${servico._id}`)
  }

  getServico(): Observable<Servico> {
    return this.subjServico$.asObservable();
  }
  clearCliente() {
    this.subjServico$.next(null);
  }

}
