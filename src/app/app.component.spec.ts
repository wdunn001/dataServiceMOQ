import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { materialModules } from './material/material.module';
import { TrackByPipe } from './pipes/track-by.pipe';
import { DataService } from './services/data.service';
import { MockDataService } from './services/mocks/mock.data.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DynamicFormComponent,
        TrackByPipe,
        AutoCompleteComponent
      ],
      imports: [ materialModules, FormsModule, ReactiveFormsModule, NoopAnimationsModule],
      providers: [{provide: DataService, useClass:  MockDataService }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Bold Penguin'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Bold Penguin');
  });

  it('should render title in a mar-toolbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-toolbar').textContent).toContain('Bold Penguin');
  });
});
