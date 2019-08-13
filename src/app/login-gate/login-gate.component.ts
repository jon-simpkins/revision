import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'login-gate',
  templateUrl: './login-gate.component.html',
  styleUrls: ['./login-gate.component.scss'],
})
export class LoginGateComponent implements OnInit {

  @Input() loggedIn: boolean;

  constructor() {

  }

  ngOnInit() {
  }
}
