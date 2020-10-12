import { Component, OnInit } from '@angular/core';
import { ServicoService } from './servico.service';
import { Observable } from 'rxjs';
import { Servico } from './servico.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogExcluirServico } from './dialog-excluir/dialog-excluir-servico';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent implements OnInit {

  servico$: Servico[];

  constructor(private servicoService: ServicoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { 
      this.servicoService.getServicos().subscribe(dados => this.servico$ = dados);
    }

  ngOnInit() {
    this.servicoService.getServicos().subscribe(dados => this.servico$ = dados);
  }

  EditarServico(servico:Servico) {
    this.servicoService.getById(servico._id).subscribe(
     (s) => {
       console.log(s);
       this.router.navigateByUrl('/main/cliente/servico/editar-servico')
     },
     (err) => {
       console.error(err);
     }
   )
 }
 
 excluirServico(servico: Servico) {
   const dialogRef = this.dialog.open(DialogExcluirServico, {
     width: '350px',
     data: {}
   });
   dialogRef.afterClosed().subscribe(result => {
     if (result) {
       this.servicoService.delete(servico)
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
}
