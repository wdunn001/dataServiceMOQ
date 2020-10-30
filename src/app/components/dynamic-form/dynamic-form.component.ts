import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Question, QuestionResponse } from 'src/app/models/question.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  formModel: Question[] = [];

  subscriptions: Subscription[];

  constructor(private api: ApiService) { }


  ngOnInit() {
    this.api.getQuestions().subscribe(r => {
      this.formModel = r
      this.formGroup = this.buildFormGroup();
    });
   
  }

  buildFormGroup(): FormGroup {
    const group: any = {};

    this.formModel.forEach(question => {
      group[question.id] = new FormControl('', this.constructValidation(question))
    });

    return new FormGroup(group);
  }



  constructValidation(question: Question): ValidatorFn | null {
    let validations: ValidatorFn[] = []
    if (question.required) {
      validations.push(Validators.required)
    }
    //this could be very confusing if min and max were introduced
    if (question.max) {
      validations.push(Validators.maxLength(question.max))
    }
    if (question.min) {
      validations.push(Validators.minLength(question.min))
    }

    return Validators.compose(validations)
  }

  submit() {
    const formValue = this.formGroup.value;
    let formResponse: QuestionResponse[] = Object.keys(formValue).map( k => {
      { return { question_id: +k, text: formValue[k] } }
    })
    this.api.postResults(formResponse).subscribe( r => {
      //adding error handling was not part of the requirements and the post doesnt properly implement http status codes so I am assuming thats beyond the scope of this code test. 
      console.log(r);

    })
  }

  cancel() {
    throw new Error('not implemented');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }
}
