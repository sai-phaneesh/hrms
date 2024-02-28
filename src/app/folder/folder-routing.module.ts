import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { LeaveComponent } from 'src/leaveManagement/components/leave/leave.component';

const routes: Routes = [
  {
    path: '',
    component: FolderPage
  },
  {
    path: 'leave',
    component: LeaveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
