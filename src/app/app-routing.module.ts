import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductRegisterComponent } from './component/product-register/product-register.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserRegisterComponent } from './component/user-register/user-register.component';

const routes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'product', component: ProductListComponent},
  {path: 'product/register', component: ProductRegisterComponent},
  {path: 'product/edit/:id', component: ProductRegisterComponent},
  {path: 'user', component: UserListComponent},
  {path: 'user/edit/:id', component: UserRegisterComponent},
  {path: 'user/register', component: UserRegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
