import { Component, OnInit, Input, ViewChild , Inject} from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  feedbackForm: FormGroup;
  comment: Comment;
  dish : Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMess: string;
  dishcopy: Dish;
  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
  'comment': '',
  'author': '',
};
validationMessages = {
  'comment': {
    'required':      'Comment is required.',
  },
  'author': {
    'required':      'Author Name is required.',
    'minlength':     'Author Name must be at least 2 characters long.',
  },
};



  constructor(private dishservice: DishService,
      private route: ActivatedRoute,
      private location: Location,
      private fb: FormBuilder,
     @Inject('BaseURL') private BaseURL) {
      this.createForm();
       }

      ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
     errmess => this.errMess = <any>errmess);
    }

    createForm() {
      this.feedbackForm = this.fb.group({
         rating: '',
         comment: ['', Validators.required ],
         author: ['', [Validators.required, Validators.minLength(2)] ],
         date:'',

        });
        this.feedbackForm.valueChanges
        .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now

    }

    onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

    onSubmit(){
      this.comment = this.feedbackForm.value;
      let currentDate =   new Date() ;
     this.comment.date=( currentDate.toISOString());
    // this.dish.comments.push(this.comment);
    this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
     .subscribe(dish => {
       this.dish = dish; this.dishcopy = dish;
     },
     errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
      console.log(currentDate);
      this.feedbackForm.reset({
        rating: '',
        comment: '',
        author: '',
        date: '',
      });
      this.feedbackFormDirective.resetForm();
    }
    setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }



}
