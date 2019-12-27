import { Component, OnInit } from '@angular/core';

/**
 * Component for selecting a known workspace
 * or for starting a new one.
 * 
 * This would be the entry point for new users
 */

@Component({
  selector: 'workspace-menu',
  templateUrl: './workspace-menu.component.html',
  styleUrls: ['./workspace-menu.component.scss']
})
export class WorkspaceMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
