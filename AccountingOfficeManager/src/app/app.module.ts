import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { JwtModule } from '@auth0/angular-jwt';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { WorkManagementComponent } from './components/work-management/work-management.component';
import { ClientManagementComponent } from './components/client-management/client-management.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { ActionsComponent } from './components/actions/actions.component';
import { AoContactComponent } from './components/ao-contact/ao-contact.component';
import { EmployeesManagementComponent } from './components/employees-management/employees-management.component';

import { CalendarModule, DateAdapter, CalendarWeekModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';

const components = [
  AppComponent,
  HomeComponent,
  LoginComponent,
  RegisterComponent,
  UserHomeComponent,
  WorkManagementComponent,
  ClientManagementComponent,
  UserProfileComponent,
  CalendarComponent,
  ClientProfileComponent,
  ActionsComponent,
  AoContactComponent,
  EmployeesManagementComponent,
  EmployeeInfoComponent,
]

const material = [
  MatSidenavModule,
  MatDividerModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatGridListModule,
  MatTableModule,
  MatExpansionModule,
]

@NgModule({
  declarations: [
    components,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    CalendarWeekModule,
    material,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
             return     localStorage.getItem('access_token');
          },
        allowedDomains: [environment.APIEndpoint],
        disallowedRoutes: [environment.APIEndpoint + " /login"]
      }
    }),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
