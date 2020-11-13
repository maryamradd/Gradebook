import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGradeAddEditComponent } from './student-grade-add-edit.component';

describe('StudentGradeAddEditComponent', () => {
  let component: StudentGradeAddEditComponent;
  let fixture: ComponentFixture<StudentGradeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentGradeAddEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGradeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
