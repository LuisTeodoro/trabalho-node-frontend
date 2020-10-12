import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {
  
  formRegister = this.fb.group({
    'nome': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
    'senha': ['', [Validators.required, Validators.minLength(6)]],
    'senha2': ['', [Validators.required, Validators.minLength(6)]],

  }, { validator: this.matchingPasswords });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }
  
  matchingPasswords(group: FormGroup){
    if(group){
      const senha1 = group.controls['senha'].value;
      const senha2 = group.controls['senha2'].value;
      if(senha1 == senha2) {
        return null;
      }
    }
    return {matching: false};
  }
  
  onSubmit(){
    console.log(this.formRegister.value);
    let u: Usuario = {  ...this.formRegister.value};
    this.authService.register(u)
    .subscribe(
      (u) => {
        this.snackBar.open('Registrado com sucesso. Use suas credenciais para logar', 
        'OK', {duration: 2000});
        this.router.navigateByUrl('/auth/login');
      },
      (err) => {
        console.error(err);
        this.snackBar.open('Não foi possivel registrar', 'OK', {duration: 2000});
      }
    )
  }
  

}
