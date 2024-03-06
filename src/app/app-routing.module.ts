import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/common/guards';
// import { HomeComponent } from 'src/profile/components/home';
import { LoginComponent } from 'src/profile/components/login';
import { SignupComponent } from 'src/profile/components/signup';
import { ForgotPasswordComponent } from 'src/profile/components/forgotPassword';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', loadComponent: () => import('src/profile/components/signup/index').then(mod => mod.SignupComponent) },
  { path: 'forgot-password', loadComponent: () => import('src/profile/components/forgotPassword/fp.component').then(mod => mod.ForgotPasswordComponent) },
  { path: 'home/leave', canActivate: [AuthGuard], loadComponent: () => import('src/leaveManagement/components/leave/leave.component').then(mod => mod.LeaveComponent) },
  { path: 'home/profile', canActivate: [AuthGuard], loadComponent: () => import('src/profile/components/profile/profile.component').then(comp => comp.ProfileComponent) },

  // { path: 'signup', component: SignupComponent },
  // { path: 'forgot-password', component: ForgotPasswordComponent },
  // { path: '', redirectTo: 'home/leave', pathMatch: 'full'},
  // {
  //   path: 'home/:id',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  // otherwise redirect to home
  {
    path: '**',
    redirectTo: 'home/leave',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
