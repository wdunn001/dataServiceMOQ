import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { materialModules } from 'src/app/material/material.module';
import { TrackByPipe } from 'src/app/pipes/track-by.pipe';
import { DataService } from 'src/app/services/data.service';
import { MockDataService } from 'src/app/services/mocks/mock.data.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

import { AutoCompleteComponent } from './auto-complete.component';

describe('AutoCompleteComponent', () => {
  let component: AutoCompleteComponent;
  let fixture: ComponentFixture<AutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompleteComponent, DynamicFormComponent, TrackByPipe ],
      imports: [ materialModules, FormsModule, ReactiveFormsModule, NoopAnimationsModule],
      providers: [{provide: DataService, useClass:  MockDataService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
