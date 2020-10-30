import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { materialModules } from 'src/app/material/material.module';
import { DataService } from 'src/app/services/data.service';
import { MockDataService } from 'src/app/services/mocks/mock.data.service';

import { DynamicFormComponent } from './dynamic-form.component';

xdescribe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFormComponent],
      imports: [materialModules, FormsModule, ReactiveFormsModule, NoopAnimationsModule],
      providers: [{provide: DataService, useClass:  MockDataService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
