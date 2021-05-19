import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionsComponent } from './components/actions/actions.component';
import { AoContactComponent } from './components/ao-contact/ao-contact.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ClientManagementComponent } from './components/client-management/client-management.component';
import { EmployeesManagementComponent } from './components/employees-management/employees-management.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WorkManagementComponent } from './components/work-management/work-management.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'user-home', component: UserHomeComponent},
    { path: 'work', component: WorkManagementComponent},
    { path: 'clients', component: ClientManagementComponent},
    { path: 'profile', component: UserProfileComponent},
    { path: 'calendar', component: CalendarComponent},
    { path: 'actions', component: ActionsComponent},
    { path: 'aocontact', component: AoContactComponent},
    { path: 'employees', component: EmployeesManagementComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule { }