import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  usuarios:any = [];
  isAdmin = false;
  

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    
  }

  getUserInfo() {
    this.userService.getInfo().subscribe((data:any) => {
      if(data.hasOwnProperty('user')) {
        if(data.user.role != 'Administrador') {
          this.router.navigate(['/']);
        } else {
          this.getUsers();
        }
      } else {
        alert('Ocurrió un problema, por favor vuelva a iniciar sesión');
        this.logout();
      }
    })
  }

  getUsers() {
    this.userService.getAll().subscribe((data:any) => {
      this.usuarios = data;
    })
  }

  mostrarDetalles(idx: any) {
    let cardUsuario = document.querySelector(`.usuario:nth-of-type(${idx})`);
    let contenedorUsuario = document.querySelector('.usuarios');
    let cardEstaActiva = cardUsuario?.classList.contains('usuario--ver-detalles');
    if (cardEstaActiva) {
      cardUsuario?.classList.remove('usuario--ver-detalles');
      contenedorUsuario?.classList.remove('usuarios--mostrando-detalles');
    } else {
      let cardActiva = document.querySelector(`.usuario--ver-detalles`);
      cardActiva?.classList.remove('usuario--ver-detalles');
      cardUsuario?.classList.add('usuario--ver-detalles');
      contenedorUsuario?.classList.add('usuarios--mostrando-detalles');
    }
  }

  logout() {
    this.authService.logout().subscribe(data => {
      this.authService.clearToken();
      window.location.reload();
    })
  }
  

}
