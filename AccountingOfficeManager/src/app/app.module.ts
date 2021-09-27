import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSortModule } from '@angular/material/sort';

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
import { AddEventComponent } from './components/add-event/add-event.component';
import { RegisterCcComponent } from './components/register-cc/register-cc.component';
import { CompaniesManagementComponent } from './components/companies-management/companies-management.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';

import { CalendarModule, DateAdapter, CalendarCommonModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
  ClientInfoComponent,
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
  MatDialogModule,
  MatCheckboxModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MaterialFileInputModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatSortModule,
]

@NgModule({
  declarations: [
    components,
    AddEventComponent,
    RegisterCcComponent,
    CompaniesManagementComponent,
    CompanyInfoComponent,
    AddClientComponent,
    AddEmployeeComponent,
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
    material,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
             return     localStorage.getItem('access_token');
          },
        allowedDomains: [environment.APIEndpoint, location.origin],
        disallowedRoutes: [environment.APIEndpoint + "/login"]
      }
    }),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas :[CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}