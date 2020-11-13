import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentGrade } from '../models/studentgrade';

@Component({
  selector: 'app-student-grade',
  templateUrl: './student-grade.component.html',
  styleUrls: ['./student-grade.component.css'],
})
export class StudentGradeComponent implements OnInit {
  public appUrl: string;
  public apiUrl: string;
  public Id: number;
  public studentGrade: StudentGrade;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private avRoute: ActivatedRoute,
  ) {
    this.appUrl = baseUrl;
    this.apiUrl = 'api/StudentGrades/';
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.Id = this.avRoute.snapshot.params[idParam];
    }
  }

  public ngOnInit(): void {
    this.loadStudentGrade(this.Id);
  }

  public loadStudentGrade(studentId: number): void {
    this.http
      .get<StudentGrade>(this.appUrl + this.apiUrl + studentId)
      .subscribe(
        (result) => {
          this.studentGrade = result;
        },
        (error) => console.error(error),
      );
  }
}
