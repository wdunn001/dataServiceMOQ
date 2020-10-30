import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { AutoCompleteOption } from 'src/app/models/auto-complete-option.model';
import { Question } from 'src/app/models/question.model';
import { ApiService } from 'src/app/services/api.service';

function coerceBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== "false";
}

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoCompleteComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() question: Question;

  /**
  * Getters and setters for internal values
  */

  @Input()
  get value(): any {
    return this._value;
  }
  set value(newValue: any) {
    if (this._value !== newValue) {
      // Set this before proceeding to ensure no circular loop occurs with selection.
      this._value = newValue;
    }
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
  }

  options: Observable<AutoCompleteOption[]>;

  filterControl = new FormControl();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private changeDetectorRef: ChangeDetectorRef,
    private api: ApiService) {
    if (ngControl != null) {
      ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.options =
      this.filterControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        switchMap(
          value => this.api.searchNAICS(value).pipe(
            map(r =>
              r.map(c => ({ value: c.code, text: c.description }))
            )
          )
        )
      );
  }

  optionSelected(e: MatAutocompleteSelectedEvent) {
    this.onChange(e.option.id);
  }


  resetInput() {
    this.filterControl.reset();
    this.onChange(null);
  }

  @Input() placeholder: string;

  private _value: any = "";
  public _disabled: boolean = false;

  onChange: (value: any) => void = () => { };

  /**
   * onTouch function registered via registerOnTouch (ControlValueAccessor).
   */
  onTouched: () => any = () => { };


  get errors() {
    const control = this.ngControl && this.ngControl.control;
    if (control) {
      return control.touched && control.errors;
    }
    return null;
  }

  /**
   * Methods from the ControlValueAccessor
   */
  writeValue(value: any) {
    this.value = value;
    this.changeDetectorRef.markForCheck();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  // Optional
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void {
  }
}
