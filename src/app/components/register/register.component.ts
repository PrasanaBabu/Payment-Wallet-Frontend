import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form = {
    username: '' ,
    id: '',
    password: '',
    confirmPassword: ''
  };

  onSubmit():void{
    console.log(JSON.stringify(this.form));
  }

  onReset(form: NgForm): void{
    form.reset();
  }

}
