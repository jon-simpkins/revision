import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BeatMapView, BeatsService} from '../beats.service';
import {Beat} from '../../protos';

@Component({
  selector: 'app-beat-page',
  templateUrl: './beat-page.component.html',
  styleUrls: ['./beat-page.component.scss']
})
export class BeatPageComponent implements OnInit, OnDestroy {

  beatListView: BeatMapView[] = [];
  beatMapViewSubscription = '';

  selectedBeatId = '';

  selectedBeat: Beat|null = null;
  selectedBeatSubscription = '';

  constructor(private beatsService: BeatsService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.beatMapViewSubscription = this.beatsService.subscribeToBeatMapView((newValue) => {
      this.beatListView = Array.from(newValue.values()).sort((a, b) => {
        return b.lastUpdated - a.lastUpdated;
      });
      this.ref.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.beatsService.cancelSubscription(this.beatMapViewSubscription);
    this.beatsService.cancelSubscription(this.selectedBeatSubscription);
  }

  async newBeat(): Promise<void> {
    const newUuid = await this.beatsService.createNewBeat();
    await this.selectBeat(newUuid);
  }

  async selectBeat(newUuid: string): Promise<void> {
    this.selectedBeatId = newUuid;
    this.selectedBeat = null;

    this.beatsService.cancelSubscription(this.selectedBeatSubscription);
    if (!!newUuid.length) {
      this.selectedBeatSubscription = this.beatsService.subscribeToBeat(newUuid, (newValue) => {
        this.selectedBeat = newValue;
        this.ref.markForCheck();
      });
    }

    this.ref.markForCheck();
  }

  async deleteBeat(): Promise<void> {
    await this.beatsService.deleteBeat(
      this.selectedBeatId
    );
    await this.selectBeat('');
  }

}
