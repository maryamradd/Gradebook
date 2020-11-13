import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradeBookComponent } from './grade-book/grade-book.component';
import { StudentGradeAddEditComponent } from './student-grade-add-edit/student-grade-add-edit.component';
import { StudentGradeComponent } from './student-grade/student-grade.component';

const routes: Routes = [
  { path: '', component: GradeBookComponent, pathMatch: 'full' },
  { path: 'add', component: StudentGradeAddEditComponent },
  { path: 'student/:id', component: StudentGradeComponent },
  { path: 'student/edit/:id', component: StudentGradeAddEditComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
