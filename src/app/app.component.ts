import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'prueba-tecnica-frontend';

  isLogged=false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLogged = this.authService.isLogged()
    if (!this.isLogged) {
      this.router.navigate(['/login']);
    }
  }
}
