import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BeatMapView, BeatsService} from '../beats.service';

@Component({
  selector: 'app-beat-page',
  templateUrl: './beat-page.component.html',
  styleUrls: ['./beat-page.component.scss']
})
export class BeatPageComponent implements OnInit, OnDestroy {

  allBeatsSummary: BeatMapView[] = [];
  beatMapViewSubscription = '';

  constructor(private beatsService: BeatsService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.beatMapViewSubscription = this.beatsService.subscribeToBeatMapView((newValue) => {
      this.allBeatsSummary = Array.from(newValue.values()).sort((a, b) => {
        return b.lastUpdated - a.lastUpdated;
      });
      this.ref.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.beatsService.cancelSubscription(this.beatMapViewSubscription);
  }

  async newBeat(): Promise<void> {
    const newUuid = await this.beatsService.createNewBeat();
    console.log(newUuid + ' created');
  }

  async deleteBeat(): Promise<void> {
    // for now, just delete the last beat
    const uuidToDelete = this.allBeatsSummary[this.allBeatsSummary.length - 1].id;

    await this.beatsService.deleteBeat(
      uuidToDelete
    );
  }

  beatCount(): number {
    return this.allBeatsSummary.length;
  }

}
