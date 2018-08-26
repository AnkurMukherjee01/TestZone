import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule}   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule,MatTabsModule, MatInputModule,MatTableModule,MatSnackBarModule, MatPaginatorModule ,
  MatRadioModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LoginComponent } from './login/login.component';
import { RestService } from "./rest.service";
import { Interceptor } from "./app.interceptor";
import { AuthService } from "./auth.service";
import { TokenStorage } from "./token.storage";
import { HomeComponent } from './home/home.component';
import { McqTestComponent } from './mcq-test/mcq-test.component';
import { AdminComponent } from './admin/admin.component';
import { McqGiveTestComponent } from './mcq-give-test/mcq-give-test.component';
import { MinuteSecondsPipe } from './mcq-give-test/mcq-give-test.component';
import { McqTestQuestionComponent } from './mcq-test-question/mcq-test-question.component';
import { UserDetComponent } from './user-det/user-det.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    McqTestComponent,
    AdminComponent,
    McqGiveTestComponent,
    MinuteSecondsPipe,
    McqTestQuestionComponent,
    UserDetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule,MatTabsModule, MatInputModule,MatTableModule,MatSelectModule,
    MatRadioModule,
    MatPaginatorModule ,
    MatAutocompleteModule,
    MatSnackBarModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [RestService, AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
    ,TokenStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
