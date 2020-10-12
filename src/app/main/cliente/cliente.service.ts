import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cliente } from './cliente.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  readonly API = 'http://127.0.0.1:8080';
  private subjCliente$: BehaviorSubject<Cliente> = new BehaviorSubject(null);

  /*httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer '+localStorage.getItem("token"),
    })
  };*/
  
  constructor(private http: HttpClient) { }

  create(cliente:Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.API}/clientes`, cliente)
  }

  getById(_id:String): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API}/clientes/${_id}`).pipe(
      tap((c: Cliente) => {
        this.subjCliente$.next(c);
      })
    )
  }

  update(cliente:Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.API}/clientes/${cliente._id}`, cliente)
  }

  get() {
    return this.http.get<Cliente[]>(`${this.API}/clientes`)
  }

  delete(cliente:Cliente): Observable<Object> {
    return this.http.delete(`${this.API}/clientes/${cliente._id}`)
  }

  getCliente(): Observable<Cliente> {
    return this.subjCliente$.asObservable();
  }
  clearCliente() {
    this.subjCliente$.next(null);
  }
}
