import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentGrade } from '../models/studentgrade';

@Component({
  selector: 'app-student-grade-add-edit',
  templateUrl: './student-grade-add-edit.component.html',
  styleUrls: ['./student-grade-add-edit.component.css'],
})
export class StudentGradeAddEditComponent implements OnInit {
  public form: FormGroup;
  public actionType: string;
  public formStudentNumber: number;
  public formName: string;
  public formSection: string;
  public formGrade: number;
  public studentId: number;
  public existingStudentGrade: StudentGrade;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  public appUrl: string;
  public apiUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.appUrl = baseUrl;
    this.apiUrl = 'api/StudentGrades/';

    const idParam = 'id';
    this.actionType = 'Add';
    this.formStudentNumber = 0;
    this.formName = 'name';
    this.formSection = 'section';
    this.formGrade = 0;
    if (this.avRoute.snapshot.params[idParam]) {
      this.studentId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group({
      studentNumber: ['', [Validators.required]],
      name: ['', [Validators.required]],
      section: ['', [Validators.required]],
      grade: ['', [Validators.required]],
    });
  }

  public ngOnInit(): void {
    if (this.studentId > 0) {
      this.actionType = 'Edit';
      this.http
        .get<StudentGrade>(this.appUrl + this.apiUrl + this.studentId)
        .subscribe(
          (data) => {
            this.existingStudentGrade = data;
            this.form.controls.studentNumber.setValue(
              this.existingStudentGrade.studentNumber,
            );
            this.form.controls.name.setValue(this.existingStudentGrade.name);
            this.form.controls.section.setValue(
              this.existingStudentGrade.section,
            );
            this.form.controls.grade.setValue(
              this.existingStudentGrade.grade,
            );
          },
          (error) => console.error(error),
        );
    }
  }

  public save(): any {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      const newStudentGrade: StudentGrade = {
        studentNumber: Number(this.form.get('studentNumber').value),
        name: this.form.get('name').value,
        section: this.form.get('section').value,
        grade: Number(this.form.get('grade').value),
      };

      this.http
        .post<StudentGrade>(
          this.appUrl + this.apiUrl,
          JSON.stringify(newStudentGrade),
          this.httpOptions,
        )
        .subscribe(
          (data) => {
            this.router.navigate(['/student', data.id]);
          },
          (error) => console.error(error),
        );
    }

    if (this.actionType === 'Edit') {
      const studentGrade: StudentGrade = {
        id: Number(this.studentId),
        studentNumber: Number(this.form.get('studentNumber').value),
        name: this.form.get('name').value,
        section: this.form.get('section').value,
        grade: Number(this.form.get('grade').value),
      };

      this.http
        .put<StudentGrade>(
          this.appUrl + this.apiUrl + this.studentId,
          JSON.stringify(studentGrade),
          this.httpOptions,
        )
        .subscribe(
          (data) => {
            this.router.navigate(['/']);
          },
          (error) => console.error(error),
        );
    }
  }

  public cancel(): void {
    this.router.navigate(['/']);
  }

  get studentNumber() {
    return this.form.get('studentNumber');
  }
  get name() {
    return this.form.get('name');
  }
  get section() {
    return this.form.get('section');
  }
  get grade() {
    return this.form.get('grade');
  }
}
