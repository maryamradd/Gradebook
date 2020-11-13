import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentGrade } from '../models/studentgrade';
@Component({
  selector: 'app-grade-book',
  templateUrl: './grade-book.component.html',
  // tslint:disable-next-line: object-literal-sort-keys
  styleUrls: ['./grade-book.component.css'],
})
export class GradeBookComponent implements OnInit {
  public appUrl: string;
  public apiUrl: string;
  public grades: StudentGrade[];
  public displayedColumns: string[] = [
    'id',
    'studentNumber',
    'name',
    'section',
    'grade',
    'edit',
    'delete',
  ];

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.appUrl = baseUrl;
    this.apiUrl = 'api/StudentGrades/';
  }
  public ngOnInit(): void {
    this.loadGradeBook();
  }

  public loadGradeBook(): void {
    this.http.get<StudentGrade[]>(this.appUrl + this.apiUrl).subscribe(
      (result) => {
        this.grades = result;
      },
      (error) => console.error(error),
    );
  }

  public delete(Id): void {
    const ans = confirm(
      'Do you want to delete this student record with id: ' + Id,
    );
    if (ans) {
      this.http.delete(this.appUrl + this.apiUrl + Id).subscribe(
        (result) => {
          this.loadGradeBook();
        },
        (error) => console.error(error),
      );
    }
  }
}
