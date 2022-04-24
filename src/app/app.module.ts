import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './components/nav/nav.component';
import { LandingComponent } from './components/landing/landing.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule} from "@angular/material/button";
import { AuthGuard } from "./guards/auth.guard";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from "@angular/fire/auth";
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatTabsModule} from "@angular/material/tabs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import { UserComponent } from './components/user/user.component';
import {NgApexchartsModule} from "ng-apexcharts";
import {ChartModule} from "primeng/chart";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {FileUploadModule} from "primeng/fileupload";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {RatingModule} from "primeng/rating";
import {HttpClientModule} from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";
import {CalendarModule} from "primeng/calendar";
import {SliderModule} from "primeng/slider";
import {MultiSelectModule} from "primeng/multiselect";
import {ContextMenuModule} from "primeng/contextmenu";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ProgressBarModule} from "primeng/progressbar";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RippleModule} from "primeng/ripple";
import {AccordionModule} from "primeng/accordion";
import {KnobModule} from "primeng/knob";

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);
import {ConfirmPopupModule} from 'primeng/confirmpopup';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LandingComponent,
    LoginComponent,
    ProfileComponent,
    UserComponent
  ],
    imports: [
        ConfirmPopupModule,
        MatProgressBarModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgApexchartsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        AngularFireAuthModule,
        NgbModule,
        MatButtonModule,
        MatMenuModule,
        MatTabsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        ChartModule,
        ToastModule,
        ToolbarModule,
        FileUploadModule,
        TableModule,
        DialogModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        ConfirmDialogModule,
        FormsModule,
        RatingModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        TableModule,
        CalendarModule,
        SliderModule,
        DialogModule,
        MultiSelectModule,
        ContextMenuModule,
        DropdownModule,
        ButtonModule,
        ToastModule,
        InputTextModule,
        ProgressBarModule,
        HttpClientModule,
        FileUploadModule,
        ToolbarModule,
        RatingModule,
        FormsModule,
        RadioButtonModule,
        InputNumberModule,
        ConfirmDialogModule,
        InputTextareaModule,
        RippleModule,
        AccordionModule,
        KnobModule,
        FullCalendarModule
    ],
  providers: [AuthGuard, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
