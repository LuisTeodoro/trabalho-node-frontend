import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './main/auth/auth.service';
import { Usuario } from './main/auth/usuario.model';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DialogExcluirUsuario } from './main/usuario/dialog-excluir/dialog-excluir-usuario';
import { UsuarioService } from './main/usuario/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from './main/cliente/cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    authenticated$ : Observable<boolean>;
    user$: Observable<Usuario>;
    usuario: Usuario;
    constructor(private authService: AuthService,
      private usuarioService : UsuarioService,
      private dialog: MatDialog,
      private snackBar: MatSnackBar,
      private router: Router){
        this.authenticated$ = this.authService.isAuthenticated();
        this.user$ = this.authService.getUser();
    }

    logout() {
      this.authService.logout();
      this.router.navigateByUrl('/auth/login');
    }

    excluirUsuario(){
      
      const dialogRef = this.dialog.open(DialogExcluirUsuario, {
        width: '350px',
        data: {}
      });
      this.user$.subscribe(data => this.usuario = data)
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.usuarioService.delete(this.usuario._id)
            .subscribe(obj=>{
              this.snackBar.open("Usuário excluido!", 'OK', {duration: 2000});
            });
            this.logout();
        }
      });
      
    }
}
