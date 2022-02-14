import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  name = '';
  isAdmin = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.controllSubMenu();
    this.getUserInfo();
  }


  getUserInfo() {
    this.userService.getInfo().subscribe((data:any) => {
      if(data.hasOwnProperty('user')) {
        this.name = data.user.name;
        this.isAdmin = data.user.role == 'Administrador'? true: false;
      } else {
        alert('Ocurrió un problema, por favor vuelva a iniciar sesión');
        this.logout();
      }
    })
  }

  controllSubMenu() {
    let boton = document.getElementsByClassName('navbar__button')[0];
    let submenu = document.getElementsByClassName('navbar__submenu-container')[0];
    boton.addEventListener('click', () => {      
      submenu.classList.toggle('activo');
    });
    let botones_link = document.getElementsByClassName('navbar__link');
    Array.from(botones_link).forEach(botonLink => {
      botonLink.addEventListener('click', () => {      
        submenu.classList.remove('activo');
      });
    })    
  }

  logout() {
    this.authService.logout().subscribe(data => {
      this.authService.clearToken();
      window.location.reload();
    })
  }

}
