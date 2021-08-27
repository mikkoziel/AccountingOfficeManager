import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionsComponent } from './components/actions/actions.component';
import { AoContactComponent } from './components/ao-contact/ao-contact.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { ClientManagementComponent } from './components/client-management/client-management.component';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';
import { EmployeesManagementComponent } from './components/employees-management/employees-management.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterCcComponent } from './components/register-cc/register-cc.component';
import { RegisterComponent } from './components/register/register.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WorkManagementComponent } from './components/work-management/work-management.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent},
    // { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'user-home', component: UserHomeComponent, canActivate: [AuthGuard]},
    { path: 'work', component: WorkManagementComponent, canActivate: [AuthGuard]},
    { path: 'clients', component: ClientManagementComponent, canActivate: [AuthGuard]},
    { path: 'clients/:id', component: ClientInfoComponent, canActivate: [AuthGuard]},
    { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
    { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
    { path: 'actions', component: ActionsComponent, canActivate: [AuthGuard]},
    { path: 'aocontact', component: AoContactComponent, canActivate: [AuthGuard]},
    { path: 'employees', component: EmployeesManagementComponent, canActivate: [AuthGuard]},
    { path: 'employees/:id', component: EmployeeInfoComponent, canActivate: [AuthGuard]},
    { path: 'register-cc', component: RegisterCcComponent, canActivate: [AuthGuard]},
  

]

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule { }