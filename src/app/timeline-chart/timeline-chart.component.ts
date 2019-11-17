import {AfterViewInit, Component, Input} from '@angular/core';

import * as uuid from 'uuid/v4';
import TimelineBlock from '../../types/TimelineBlock';
import {StoryService} from '../services/story.service';

@Component({
  selector: 'timeline-chart',
  templateUrl: './timeline-chart.component.html',
  styleUrls: ['./timeline-chart.component.scss']
})
export class TimelineChartComponent implements AfterViewInit {

  visualization: any;
  chart: any;
  dataTable: any;

  minWidth = 600;
  currentWidth: number;

  chartId = 'timeline' + uuid().replace('-', '');

  @Input() blocks: TimelineBlock[];

  constructor(private storyService: StoryService) {
    this.currentWidth = this.minWidth;
  }

  ngAfterViewInit() {
    // @ts-ignore
    if (window.google && window.google.visualization) {
      this.initApi(); // Already loaded script
      return;
    }

    const body = document.getElementsByTagName('body')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = () => {
      // @ts-ignore
      window.google.charts.load('current', {packages: ['timeline']});
      // @ts-ignore
      window.google.charts.setOnLoadCallback(() => {
        this.initApi();
      });
    };
    script.src = 'https://www.gstatic.com/charts/loader.js';
    body.appendChild(script);
  }

  initApi() {
    // @ts-ignore
    this.visualization = window.google.visualization;

    const container = document.getElementById(this.chartId);
    this.dataTable = new this.visualization.DataTable();
    this.dataTable.addColumn({ type: 'string', id: 'Position' });
    this.dataTable.addColumn({ type: 'string', id: 'Name' });
    this.dataTable.addColumn({ type: 'date', id: 'Start' });
    this.dataTable.addColumn({ type: 'date', id: 'End' });

    this.dataTable.addRows(
      this.blocks.map(block => {

        const startHrs = Math.floor(block.startSec / 3600);
        const startMinutes = Math.floor((block.startSec) / 60) - (60 * startHrs);
        const startSecs = block.startSec - (3600 * startHrs) - (60 * startMinutes);

        const endHrs = Math.floor(block.endSec / 3600);
        const endMinutes = Math.floor((block.endSec) / 60) - (60 * endHrs);
        const endSecs = block.endSec - (3600 * endHrs) - (60 * endMinutes);

        return [
          block.rowLabel,
          block.blockLabel,
          new Date(0, 0, 0, startHrs, startMinutes, startSecs),
          new Date(0, 0, 0, endHrs, endMinutes, endSecs)
        ];
      })
    );

    this.chart = new this.visualization.Timeline(container);
    this.visualization.events.addListener(this.chart, 'select', () => {
      let selectedRow = -1;
      try {
        selectedRow = this.chart.getSelection()[0].row;
      } catch (e) {
        // Nothing
      }

      if (selectedRow > -1 && !!this.blocks[selectedRow].viewOption) {
        this.storyService.setViewContent(
          this.blocks[selectedRow].viewOption
        );
        return;
      }
    });

    this.redraw(0);
  }

  redraw(timeout) {
    setTimeout(() => {
      this.chart.draw(this.dataTable, {
        tooltip: {
          trigger: 'none'
        }
      });
    }, timeout);
  }

  zoomOut() {
    this.currentWidth = Math.max(0.5 * this.currentWidth, this.minWidth);
    this.redraw(100);
  }

  zoomIn() {
    this.currentWidth = 2.0 * this.currentWidth;
    this.redraw(100);
  }
}
