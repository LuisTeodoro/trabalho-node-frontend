import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'senha': ['', [Validators.required, Validators.minLength(5)]]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const credenciais = this.loginForm.value;
    this.authService.login(credenciais)
    .subscribe(
      (usuario) => {
        console.log(usuario);
        this.snackBar.open(
          'Login efetuado com sucesso. Bem vindo ' + usuario["usuario"]["nome"] + '!', "OK",
          {duration: 2000});
          this.router.navigateByUrl('/main/cliente/servico');

        },
        (err) => {
          console.log(err);
          this.snackBar.open(
            'Erro no Login! ', "OK",
            { duration: 2000 });
        }
      )
  }
}
