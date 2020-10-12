import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Usuario } from '../auth/usuario.model';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  authenticated$ : Observable<boolean>;
  usuario$: Observable<Usuario>;
  usuario: Observable<Usuario>;
  user$ : Usuario;;

  formRegister = this.fb.group({
    '_id': ['', []],
    'nome': ['', [Validators.required]],
    'email': ['', [Validators.required]]
  }, { });

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router) {
      this.authenticated$ = this.authService.isAuthenticated();
      this.usuario$ = this.authService.getUser();
     }

  ngOnInit(): void {
    this.usuario$.subscribe(data => this.user$ = data)
    this.usuario = this.usuarioService.get(this.user$._id);
    
    
    this.usuario.subscribe(p=>{
      this.formRegister.patchValue(p)
    })
  }

  onSubmit(){
    if(!this.formRegister.valid){
      this.snackBar.open("Verifique os dados do formulário!", 'OK', {duration: 2000});
    }

    let p: Usuario = {  ...this.formRegister.value};
    console.log(p);
    
    this.usuarioService.update(p)
      .subscribe(
        (p) => {
          this.snackBar.open("Usuário atualizado com sucesso!", 
          'OK', {duration: 2000});
          this.router.navigateByUrl('/main/usuario');
        },
        (err) => {
          console.error(err);
          this.snackBar.open('Erro ao atualizar!', 'OK', {duration: 2000});
        }
      )
  }

}
