import { Component, OnInit } from '@angular/core';

/**
 * Component for selecting an action within a workspace
 * 
 * This would be the entry point for return users, and
 * the point where users would come back to every time they completed a
 * challenge / task.
 */

@Component({
  selector: 'action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
