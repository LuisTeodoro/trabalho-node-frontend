import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from '../servico.model';
import { Validators, FormBuilder } from '@angular/forms';
import { ServicoService } from '../servico.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cliente } from '../../cliente.model';
import { ClienteService } from '../../cliente.service';

@Component({
  selector: 'app-novo-servico',
  templateUrl: './novo-servico.component.html',
  styleUrls: ['./novo-servico.component.css']
})
export class NovoServicoComponent implements OnInit {

  servico:Observable<Servico>;
  cliente$:Observable<Cliente>;

  formRegister = this.fb.group({
    'data': ['', [Validators.required]],
    'valor': ['', [Validators.required]],
    'descricao': ['',[Validators.maxLength(100)]],
    'cliente': ['',[Validators.maxLength(100)]],

  }, {});


  constructor(
    private servicoService: ServicoService,
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.cliente$ = this.clienteService.getCliente();
    this.cliente$.subscribe(p => {
      this.formRegister.patchValue({cliente: p._id})
    });
  }

  onSubmit() {
    if(!this.formRegister.valid){
      this.snackBar.open("Verifique os dados do formulário!", 'OK', {duration: 2000});
    }
    let s: Servico = {  ...this.formRegister.value};
    this.servicoService.create(s).subscribe(
      (s) => {
        this.snackBar.open('Serviçco cadastrado com sucesso!', 'OK', {duration: 2000})
        this.router.navigateByUrl('/main/cliente/servico');
      },
      (err) => {
        console.error(err);
        this.snackBar.open('Erro ao criar serviço, tente novamente!', 'OK', {duration:2000})
      }
    )

  }

}
