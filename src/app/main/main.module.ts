import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ClienteComponent } from './cliente/cliente.component';
import { MaterialModule } from '../material.module';
import { ServicoComponent } from './cliente/servico/servico.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogExcluirUsuario } from './usuario/dialog-excluir/dialog-excluir-usuario';
import { NovoServicoComponent } from './cliente/servico/novo-servico/novo-servico.component';
import { NovoClienteComponent } from './cliente/novo-cliente/novo-cliente.component';
import { DialogExcluirCliente } from './cliente/dialog-excluir/dialog-excluir-cliente';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { EditarServicoComponent } from './cliente/servico/editar-servico/editar-servico.component';
import { DialogExcluirServico } from './cliente/servico/dialog-excluir/dialog-excluir-servico';


@NgModule({
  declarations: [EditarServicoComponent, 
    EditarClienteComponent, 
    NovoClienteComponent, 
    ClienteComponent,
    ServicoComponent, 
    DialogExcluirServico, 
    DialogExcluirUsuario, 
    DialogExcluirCliente, 
    NovoServicoComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class MainModule { }
