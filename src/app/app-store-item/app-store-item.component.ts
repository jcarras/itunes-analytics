import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { AppStoreItem, HeatMapUpdate, HeatMapData, Point } from '../../shared/types';

declare var require: any
const heatmap = require('heatmap.js/build/heatmap');

@Component({
  selector: 'app-store-item',
  templateUrl: './app-store-item.component.html',
  styleUrls: ['./app-store-item.component.css']
})
export class AppStoreItemComponent implements AfterViewInit {

  @Input() appStoreItem : AppStoreItem;

  @ViewChild('heatMap')
  private heatMapDiv: any;

  heatMapInstance = null;
  queuedPoints: Point[] = [];
  isViewable: boolean = false;

  constructor(private elementRef: ElementRef) { }

  initHeatMap(): void {
    this.heatMapInstance = heatmap.create({
      container: this.heatMapDiv.nativeElement,
      opacity: 0.7,
      radius: 15,
      min: 1,
      max: 150
    });
  }

  refreshHeatMapData(points: Point[]): void {
    const heatMapData: HeatMapData = this.heatMapInstance.getData();
    heatMapData.data = heatMapData.data.concat(points);
    this.heatMapInstance.setData(heatMapData);
  }

  subscribeForHeatMapUpdate(): void {
    this.appStoreItem.heatMapData.subscribe((next: HeatMapUpdate) => {
      if(this.isViewable) {
        this.refreshHeatMapData(next.points);
      } else {
        this.queuedPoints = this.queuedPoints.concat(next.points);
      }
    });
  }

  subscribeForIntersectionChanges(): void {
    const intersectionObserver = new IntersectionObserver((entry) => {
      if(entry[0].isIntersecting) {
        this.isViewable = true;
        if(this.queuedPoints.length > 0) {
          this.refreshHeatMapData(this.queuedPoints);
          this.queuedPoints = [];
        }
      } else {
        this.isViewable = false;
      }
    });
    intersectionObserver.observe(this.elementRef.nativeElement);
  }

  ngAfterViewInit(): void {
    this.initHeatMap();
    this.subscribeForHeatMapUpdate();
    this.subscribeForIntersectionChanges();
  }
}
