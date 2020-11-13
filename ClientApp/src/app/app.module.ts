import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GradeBookComponent } from './grade-book/grade-book.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { StudentGradeAddEditComponent } from './student-grade-add-edit/student-grade-add-edit.component';
import { StudentGradeComponent } from './student-grade/student-grade.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    GradeBookComponent,
    StudentGradeComponent,
    StudentGradeAddEditComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
