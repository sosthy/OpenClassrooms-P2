import { Component, EventEmitter, OnInit } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { flatMap, map, Observable, of, shareReplay, take, tap } from 'rxjs';
import Olympic from 'src/app/core/models/Olympic';
import OlympicChartData from 'src/app/core/models/OlympicChartData';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit 
{
  olympics$: Observable<Array<OlympicChartData>> = of();
  view: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme: string | Color = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#000EFD'],
    name: '',
    selectable: true,
    group: ScaleType.Linear
  };

  constructor(private olympicService: OlympicService) {
    this.olympics$ = this.olympicService.loadInitialData().pipe(take(1), map(this.olympicMap));
  }

  ngOnInit(): void {}

  olympicMap(olympics: Array<Olympic>) {
    return olympics.map(olympic => {      
      const medalsCount = olympic.participations.reduce((acc, current) => acc + current.medalsCount, 0);
      return { name: olympic.country, value: medalsCount};
    });    
  }

  onSelect(data: EventEmitter<any>): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: EventEmitter<any>): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: EventEmitter<any>): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
