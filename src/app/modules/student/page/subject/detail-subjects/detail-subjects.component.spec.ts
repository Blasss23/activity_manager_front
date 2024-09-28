import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSubjectsComponent } from './detail-subjects.component';

describe('DetailSubjectsComponent', () => {
  let component: DetailSubjectsComponent;
  let fixture: ComponentFixture<DetailSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSubjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
