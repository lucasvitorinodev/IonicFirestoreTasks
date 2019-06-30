import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {path} from '@angular-devkit/core';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
