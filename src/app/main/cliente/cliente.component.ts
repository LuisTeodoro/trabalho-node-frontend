import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Observable } from 'rxjs';
import { Cliente } from './cliente.model';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { state } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DialogExcluirCliente } from './dialog-excluir/dialog-excluir-cliente';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente$: Cliente[];
  response: Object;

  constructor(private clienteService: ClienteService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { 
      this.clienteService.get().subscribe(dados => this.cliente$ = dados);
    }

  ngOnInit() {
    this.clienteService.get().subscribe(dados => this.cliente$ = dados);
  }

  EditarCliente(cliente:Cliente) {
     this.clienteService.getById(cliente._id).subscribe(
      (c) => {
        console.log(c);
        this.router.navigateByUrl('/main/cliente/editar-cliente')
      },
      (err) => {
        console.error(err);
      }
    )
  }
  
  excluirCliente(cliente: Cliente) {
    const dialogRef = this.dialog.open(DialogExcluirCliente, {
      width: '350px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clienteService.delete(cliente)
          .subscribe((res) => {
            console.log(res);
            this.snackBar.open("Usuário excluido!", 'OK', { duration: 2000 });
            this.ngOnInit();
          },
            (err) => {
              console.log(err)
            });
      }
    });
  }
  novoServico(cliente: Cliente) {
    this.clienteService.getById(cliente._id).subscribe(
      (c) => {
        console.log(c);
        this.router.navigateByUrl('/main/cliente/servico/novo-servico')
      },
      (err) => {
        console.error(err);
      }
    )
  }
}
