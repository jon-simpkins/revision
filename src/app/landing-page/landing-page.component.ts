import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MonolithicDataService} from '../monolithic-data.service';

// Static landing page component.
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent implements OnInit {
  public workspaceName = '';

  constructor(private monolithicDataService: MonolithicDataService, private ref: ChangeDetectorRef) { }

  async ngOnInit(): Promise<void> {
    this.workspaceName = await this.monolithicDataService.getWorkspaceName();
    this.ref.markForCheck();
  }

}
