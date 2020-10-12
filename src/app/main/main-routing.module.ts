import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './auth/login/login.component';
import { NovoUsuarioComponent } from './auth/novo-usuario/novo-usuario.component';
import { ServicoComponent } from './cliente/servico/servico.component';
import { NovoServicoComponent } from './cliente/servico/novo-servico/novo-servico.component';
import { NovoClienteComponent } from './cliente/novo-cliente/novo-cliente.component';
import { ClienteComponent } from './cliente/cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { EditarServicoComponent } from './cliente/servico/editar-servico/editar-servico.component';


const routes: Routes = [
  {path: '', redirectTo: 'auth/login'},
  {path: 'auth/login', component: LoginComponent},
  {path: 'cliente', component: ClienteComponent},
  {path: 'usuario', component: UsuarioComponent},
  {path: 'cliente/servico', component: ServicoComponent},
  {path: 'cliente/servico/novo-servico', component: NovoServicoComponent},
  {path: 'cliente/servico/editar-servico', component: EditarServicoComponent},
  {path: 'cliente/novo-cliente', component: NovoClienteComponent},
  {path: 'cliente/editar-cliente', component: EditarClienteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
