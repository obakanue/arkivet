import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "../app/components/login/login.component";
import { RegisterComponent } from '../app/components/register/register.component';
import { AuthGuard } from './_helpers'
import { FrontPageComponent } from "../app/components/front-page/front-page.component";

const routes: Routes = [
  { path: '', component: FrontPageComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
