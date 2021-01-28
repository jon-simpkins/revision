import {Component, EventEmitter, AfterViewInit, Input, Output, OnInit} from '@angular/core';

export interface TimelineBlock {
  id: string;
  startSec: number;
  endSec: number;
  row: string;
  label: string;
}

@Component({
  selector: 'app-timeline-chart',
  templateUrl: './timeline-chart.component.html',
  styleUrls: ['./timeline-chart.component.scss']
})
export class TimelineChartComponent implements OnInit, AfterViewInit {

  @Input()
  chartHeight = 400;

  @Input()
  chartWidth = 600;

  @Input()
  timelineBlocks: TimelineBlock[] = [];

  @Output() selectBeat = new EventEmitter<string>();

  currentWidth = 600;
  chartId = '1234';

  visualization: any;
  chart: any;
  dataTable: any;

  constructor() {}

  ngOnInit(): void {
    this.currentWidth = this.chartWidth;
  }

  ngAfterViewInit(): void {
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

  initApi(): void {
    // @ts-ignore
    this.visualization = window.google.visualization;

    const container = document.getElementById(this.chartId);
    this.dataTable = new this.visualization.DataTable();
    this.dataTable.addColumn({ type: 'string', id: 'Position' });
    this.dataTable.addColumn({ type: 'string', id: 'label placeholder'});
    this.dataTable.addColumn({ type: 'string', role: 'tooltip' });
    this.dataTable.addColumn({ type: 'date', id: 'Start' });
    this.dataTable.addColumn({ type: 'date', id: 'End' });

    this.dataTable.addRows(
      this.timelineBlocks.map(block => {

        const startHrs = Math.floor(block.startSec / 3600);
        const startMinutes = Math.floor((block.startSec) / 60) - (60 * startHrs);
        const startSecs = block.startSec - (3600 * startHrs) - (60 * startMinutes);

        const endHrs = Math.floor(block.endSec / 3600);
        const endMinutes = Math.floor((block.endSec) / 60) - (60 * endHrs);
        const endSecs = block.endSec - (3600 * endHrs) - (60 * endMinutes);

        return [
          block.row,
          null,
          block.label,
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

      if (selectedRow > -1) {
        this.selectBeat.emit(this.timelineBlocks[selectedRow].id);
      }
    });

    this.redraw(0);
  }

  redraw(timeout: number): void {
    setTimeout(() => {
      this.chart.draw(this.dataTable, {
        /*tooltip: {
          trigger: 'none'
        }*/
      });
    }, timeout);
  }

  zoomOut(): void {
    this.currentWidth = Math.max(0.5 * this.currentWidth, this.chartWidth);
    this.redraw(100);
  }

  zoomIn(): void {
    this.currentWidth = 2.0 * this.currentWidth;
    this.redraw(100);
  }

}
