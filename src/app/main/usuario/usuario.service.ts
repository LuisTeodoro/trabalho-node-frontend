import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../auth/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  readonly API = 'http://127.0.0.1:8080';
  
  constructor(private http: HttpClient) { }



  update(usuario:Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API}/usuarios/${usuario._id}`, usuario)
  }

  get(_id:String): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API}/usuarios/${_id}`)
  }
  delete(_id:String): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.API}/usuarios/${_id}`)
  }
}
