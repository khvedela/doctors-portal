import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import {LandingComponent} from "./components/landing/landing.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {ProfileComponent} from "./components/profile/profile.component";
import {UserComponent} from "./components/user/user.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
