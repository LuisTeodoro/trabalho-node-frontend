import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.css']
})
export class NovoClienteComponent implements OnInit {

  cliente:Observable<Cliente>;
  cliente$:Cliente;
 

  flagCreate:Boolean = true;

  formRegister = this.fb.group({
    'nome': ['', [Validators.required]],
    'cpf': ['', [Validators.required]],
    'tel': ['',[Validators.required]],
    'email': ['', [Validators.required]],
    'endereco': ['', [Validators.required]],
    
  }, { });


  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    if (!this.formRegister.valid) {
      this.snackBar.open("Verifique os dados do formulário!", 'OK', { duration: 2000 });
    }

    let c: Cliente = { ...this.formRegister.value };
    console.log(c);
    this.clienteService.create(c)
      .subscribe(
        (c) => {
          console.log(c);
          this.snackBar.open('Cliente criado com sucesso!',
            'OK', { duration: 2000 });
          this.router.navigateByUrl('/main/cliente');
        },
        (err) => {
          console.error(err);
          this.snackBar.open(err.error.message + 'ERRO!', 'OK', { duration: 2000 });
        }
      )
  }

}
