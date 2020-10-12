import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente:Observable<Cliente>;
  cliente$:Cliente;
 

  flagCreate:Boolean = true;

  formRegister = this.fb.group({
    '_id': [''],
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
    this.cliente = this.clienteService.getCliente();
    this.cliente.subscribe(p => {
      this.formRegister.patchValue(p)
    })
  }

  onSubmit(){
    if(!this.formRegister.valid){
      this.snackBar.open("Verifique os dados do formulário!", 'OK', {duration: 2000});
    }

    let p: Cliente = {  ...this.formRegister.value};
    console.log(p);

    var obsCliente = null;
    obsCliente = this.clienteService.update(p)
    
    
    obsCliente
      .subscribe(
        (p) => {
          this.snackBar.open('Cliente atualizado com sucesso!', 
          'OK', {duration: 2000});
          this.router.navigateByUrl('/main/cliente');
        },
        (err) => {
          console.error(err);
          this.snackBar.open('Erro ao atualizar!'+ err.error.message, 'OK', {duration: 2000});
        }
      )
  }

}
