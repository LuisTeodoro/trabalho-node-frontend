import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from '../servico.model';
import { Validators, FormBuilder } from '@angular/forms';
import { ServicoService } from '../servico.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-servico',
  templateUrl: './editar-servico.component.html',
  styleUrls: ['./editar-servico.component.css']
})
export class EditarServicoComponent implements OnInit {

  servico:Observable<Servico>;

  formRegister = this.fb.group({
    '_id': [''],
    'data': ['', [Validators.required]],
    'valor': ['', [Validators.required]],
    'descricao': ['',[Validators.maxLength(100)]],
    'cliente': ['',[Validators.maxLength(100)]],

  }, {});


  constructor(
    private servicoService: ServicoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.servico = this.servicoService.getServico();
    this.servico.subscribe(s => {
      this.formRegister.patchValue(s)
    })
  }

  onSubmit() {
    if(!this.formRegister.valid){
      this.snackBar.open("Verifique os dados do formulário!", 'OK', {duration: 2000});
    }
    let s: Servico = {  ...this.formRegister.value};
    this.servicoService.update(s).subscribe(
      (p) => {
        this.snackBar.open('Serviço atualizado com sucesso!', 'OK', {duration: 2000})
        this.router.navigateByUrl('/main/cliente/servico');
      },
      (err) => {
        console.error(err);
        this.snackBar.open('Erro ao criar serviço, tente novamente!', 'OK', {duration:2000})
      }
    )

  }

}
