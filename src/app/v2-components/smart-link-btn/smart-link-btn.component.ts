import { Component, OnInit, Input } from '@angular/core';
import { ActionOption, ActionService } from '../../services/action.service';

/**
 * This component is to provide a simple button wrapper around "start action X"
 */
@Component({
  selector: 'smart-link-btn',
  templateUrl: './smart-link-btn.component.html',
  styleUrls: ['./smart-link-btn.component.scss']
})
export class SmartLinkBtnComponent implements OnInit {

  @Input() targetAction: ActionOption;
  @Input() label: string;
  @Input() icon: string;

  constructor(private actionService: ActionService) { }

  ngOnInit() {
  }

  getLabel(): string {
    return this.label;
  }

  hasIcon(): boolean {
    return !!this.icon;
  }

  getIcon(): string {
    return this.icon;
  }

  navigate() {
    this.actionService.startAction(this.targetAction);
  }

}
