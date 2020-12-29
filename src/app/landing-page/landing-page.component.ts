import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MonolithicDataService} from '../monolithic-data.service';

// Static landing page component.
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent implements OnInit, OnDestroy {
  workspaceName = '';
  workspaceNameSubscription = '';

  constructor(
    private monolithicDataService: MonolithicDataService,
    private ref: ChangeDetectorRef
  ) { }

  async ngOnInit(): Promise<void> {
    this.workspaceNameSubscription = this.monolithicDataService.subscribeToWorkspaceName((workspaceName) => {
      this.workspaceName = workspaceName;
      this.ref.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.monolithicDataService.cancelSubscriptionToWorkspaceName(this.workspaceNameSubscription);
  }
}
