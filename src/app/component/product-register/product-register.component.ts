import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit {
  id!: any;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private _route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    this.form = this.formBuilder.group({
      id: [{value: '', disabled: true}],
      name: [''],
      description: [''],
      price: 0
    });
    if(this.id!=null) {
      this.productService.get(this.id).subscribe((data:any) => {
        this.form = this.formBuilder.group({
          id: [{value: data.id, disabled: true}],
          name: [data.name],
          description: [data.description],
          price: data.price
        });
      });
    } 
  }

  submit(): void {
    let product = {
      name: this.form.getRawValue().name,
      description: this.form.getRawValue().description,
      price: this.form.getRawValue().price
    }
    if(this.id!=null) {
      this.editarProducto(product);
    } else {
      this.agregarProducto(product);
    }
    
  }

  cancelar() {
    this.router.navigate(['/product']);
  }

  agregarProducto(product:any) {
    this.productService.register(product).subscribe((data:any) => {
      if(data.hasOwnProperty('success') && data.success==true) {
        alert('El producto se guardó correctamente');
        this.router.navigate(['/product']);
      } else {
        alert('Ocurrió un problema, por favor vuelva a iniciar sesión');
        this.logout();
      }
    }, err => {
      alert('Por favor verifique los campos');
    })
  }

  editarProducto(product:any) {
    this.productService.update(this.id, product).subscribe((data:any) => {
      if(data.hasOwnProperty('success') && data.success==true) {
        alert('El producto se guardó correctamente');
        this.router.navigate(['/product']);
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
    this.productService.delete(this.id).subscribe((data: any) => {
      if (data.hasOwnProperty('success') && data.success == true) {
        alert('El producto se eliminó correctamente');
        this.router.navigate(['/product']);
      } else {
        alert('Ocurrió un problema, por favor vuelva a iniciar sesión');
        this.logout();
      }
    }, err => {
      alert('Por favor verifique los campos');
    })
  }

  
}
