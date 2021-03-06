import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MonolithicDataService} from '../monolithic-data.service';
import {BeatMapView, BeatsService} from '../beats.service';
import {Router} from '@angular/router';

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

  storyListView: BeatMapView[] = [];

  scriptLength = 110;
  pagesPerSprint = 0.25;
  splitFactor = 3.5;
  missesPerHit = 3;
  sessionsPerDay = 4;

  constructor(
    private monolithicDataService: MonolithicDataService,
    private beatsService: BeatsService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.workspaceNameSubscription = this.monolithicDataService.subscribeToWorkspaceName((workspaceName) => {
      this.workspaceName = workspaceName;
      this.ref.markForCheck();
    });

    const beatMap = await this.beatsService.getBeatMap();
    this.storyListView = Array.from(beatMap.values())
      .filter(entry => entry.parentBeats.length === 0) // Only retain top-level beats
      .sort((a, b) => {
        return b.lastUpdated - a.lastUpdated;
      });

    this.ref.markForCheck();
  }

  ngOnDestroy(): void {
    this.monolithicDataService.cancelSubscriptionToWorkspaceName(this.workspaceNameSubscription);
  }

  changeParameters(): void {
    this.scriptLength = this.pickRandomFromList([30, 60, 90, 110, 120]);
    this.pagesPerSprint = this.pickRandomFromList([0.125, 0.25, 0.5, 1]);
    this.splitFactor = this.pickRandomFromList([2, 3, 3.5, 4, 5]);
    this.missesPerHit = this.pickRandomFromList([1, 2, 3, 4, 5]);
    this.sessionsPerDay = this.pickRandomFromList([0.5, 1, 2, 4, 6, 8]);
  }

  pickRandomFromList(options: number[]): number {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }

  giveUpRate(): number {
    return 100 * this.missesPerHit / (this.missesPerHit + 1);
  }

  calculateSessionsRequired(): number {
    const treeDepth = Math.log(this.scriptLength / this.pagesPerSprint) / Math.log(this.splitFactor);

    const halfCost = this.cost(treeDepth / 2, this.splitFactor);
    const fullCost = this.cost(treeDepth, this.splitFactor);

    return (halfCost * this.missesPerHit) + (fullCost);

  }

  calculateFlatAlternativeSessions(): number {
    const halfCost = 0.5 * this.scriptLength / this.pagesPerSprint;
    const fullCost = this.scriptLength / this.pagesPerSprint;

    return (halfCost * this.missesPerHit) + (fullCost);
  }

  cost(treeDepth: number, splitFactor: number): number {
    let cost = 0;
    for (let i = 0; i < treeDepth; i++) {
      cost += Math.pow(splitFactor, i);
    }

    cost += Math.pow(splitFactor, treeDepth);

    return cost;
  }

  async newStory(): Promise<void> {
    const newId = await this.beatsService.createNewBeat();
    await this.navigateToStory(newId);
  }

  async randomStory(): Promise<void> {
    const randomId = Math.floor(Math.random() * this.storyListView.length);
    await this.navigateToStory(this.storyListView[randomId].id);
  }

  async navigateToStory(beatId: string): Promise<void> {
    await this.router.navigate(['/read', { id: beatId }]);
  }
}
