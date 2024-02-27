import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/components/guards';
import { HomeComponent } from 'src/components/home';
import { LoginComponent } from 'src/components/login';
import { SignupComponent } from 'src/components/signup';
import { ForgotPasswordComponent} from 'src/components/forgotPassword';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', redirectTo: 'home/Inbox', pathMatch: 'full'},
  {
    path: 'home/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
   // otherwise redirect to home
   {
    path: '**',
    redirectTo: 'home/Inbox',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
