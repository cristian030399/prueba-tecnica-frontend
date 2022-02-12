import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  id!: any;
  form!: FormGroup;
  showForm=false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private _route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    

    if (this.id != null) {
      this.userService.get(this.id).subscribe((data: any) => {
        // this.form = new FormGroup();
        this.form = this.formBuilder.group({
          id: [{ value: data.id, disabled: true }],
          email: [{ value: data.email, disabled: true }],
          name: [data.name],
          lastname: [data.lastname],
          direction: [data.direction],
          role: [data.role]
        });
        this.showForm = true;
      });
    } else {
      this.form = this.formBuilder.group({
        id: [''],
        email: [''],
        password: [''],
        name: [''],
        lastname: [''],
        direction: [''],
        role: ['']
      });
      this.showForm = true;
    }
  }

  submit(): void {
    let user = {
      id: this.form.getRawValue().id,
      email: this.form.getRawValue().email,
      password: this.form.getRawValue().password,
      name: this.form.getRawValue().name,
      lastname: this.form.getRawValue().lastname,
      direction: this.form.getRawValue().direction,
      role: this.form.getRawValue().role
    }

    console.log(user)
    if (this.id != null) {
      this.editarUsuario(user);
    } else {
      this.agregarUsuario(user);
    }
  }

  cancelar() {
    this.router.navigate(['/user']);
  }

  agregarUsuario(user: any) {
    this.userService.register(user).subscribe((data: any) => {
      console.log(data)
      if (data.hasOwnProperty('success') && data.success == true) {
        alert('El usuario se guardó correctamente');
        this.router.navigate(['/user']);
      } else {
        alert('Ocurrió un problema, por favor vuelva a iniciar sesión');
        this.logout();
      }
    }, err => {
      alert('Por favor verifique los campos');
    })
  }

  editarUsuario(user: any) {
    this.userService.update(this.id, user).subscribe((data: any) => {
      if (data.hasOwnProperty('success') && data.success == true) {
        alert('El usuarioo se guardó correctamente');
        this.router.navigate(['/user']);
      } else {
        alert('Ocurrió un problema, por favor vuelva a iniciar sesión');
        this.logout();
      }
    }, err => {
      alert('Por favor verifique los campos');
    })
  }

  logout() {
    this.authService.logout().subscribe(data => {
      this.authService.clearToken();
      window.location.reload();
    })
  }

  borrar() {
    this.userService.delete(this.id).subscribe((data: any) => {
      if (data.hasOwnProperty('success') && data.success == true) {
        alert('El usuario se eliminó correctamente');
        this.router.navigate(['/user']);
      } else {
        alert('Ocurrió un problema, por favor vuelva a iniciar sesión');
        this.logout();
      }
    }, err => {
      alert('Por favor verifique los campos');
    })
  }

}
