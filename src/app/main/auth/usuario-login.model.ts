import { Usuario } from './usuario.model';

export interface UsuarioLogin {
    usuario:Usuario;
    token: string;
}