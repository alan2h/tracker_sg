import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.scss'],
})
export class LoginInputComponent  implements OnInit {

  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() placeholder!: string;
  @Input() label!: string;
  @Input() icon!: string;
  @Input() iconColor!: string;
  @Input() iconSize!: string;


  constructor() { }

  ngOnInit() {}

}
