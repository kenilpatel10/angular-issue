import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminScreenComponent } from './admin/admin-screen/admin-screen.component';
import { UsersComponent } from './admin/users/users.component';

import { HomeScreenComponent } from './home/home-screen/home-screen.component';
import { MainScreenComponent } from './home/main-screen/main-screen.component';

const routes: Routes = [
  {path:'', component: HomeScreenComponent },
  {path:'issue', component: MainScreenComponent },
  {path:'adminIssue', component: AdminScreenComponent },
  {path:'users', component:UsersComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const routingComponent=[
//   AppComponent,MainScreenComponent
// ]