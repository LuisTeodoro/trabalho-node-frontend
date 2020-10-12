import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuario } from './usuario.model';
import { tap } from  'rxjs/operators';
import { UsuarioLogin } from './usuario-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly API = 'http://127.0.0.1:8080';

  private subjUser$: BehaviorSubject<Usuario> = new BehaviorSubject(null);
  private subjLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  
  constructor(private http: HttpClient) { }

  register(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API}/usuarios/novo`, usuario);
  }



  login(credenciais: {email:string, senha:string}): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>(`${this.API}/usuarios/login`, credenciais)
    .pipe(
      tap((u: UsuarioLogin) => {
        localStorage.setItem('token', u.token);
        this.subjLoggedIn$.next(true);
        this.subjUser$.next(u.usuario);
      })
    )
  }
  
  isAuthenticated(): Observable<boolean> {
    return this.subjLoggedIn$.asObservable();
  } 

  getUser(): Observable<Usuario> {
    return this.subjUser$.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this.subjLoggedIn$.next(false);
    this.subjUser$.next(null);
  }


}
