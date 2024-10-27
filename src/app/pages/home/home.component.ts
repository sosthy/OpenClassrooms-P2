import { Component, EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Color, escapeLabel, formatLabel, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { flatMap, map, Observable, of, shareReplay, take, tap } from 'rxjs';
import { HeaderItem } from 'src/app/core/models/HeaderItem';
import { Olympic } from 'src/app/core/models/Olympic';
import OlympicChartData from 'src/app/core/models/OlympicChartData';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit 
{
  olympics$: Observable<Olympic[]> = of();
  title: string = 'Medals per Country';
  items: HeaderItem[] = [
    {
      title: 'Number of JOs',
      value: 10
    },
    {
      title: 'Number of countries',
      value: 10
    },
  ]

  // options
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  trimLabels: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  label: string = "";
  val: string = "";

  colorScheme: string | Color = {
    domain: ['#8B6565', '#BDCAE5', '#90A0D6', '#6F4451', '#92829F'],
    name: '',
    selectable: true,
    group: ScaleType.Linear
  };

  constructor(private olympicService: OlympicService, private router: Router) {
    this.olympics$ = this.olympicService.getOlympics().pipe(map(this.olympicMap));
  }

  ngOnInit(): void {}

  olympicMap(olympics: Olympic[]) {
    return olympics.map(olympic => {      
      const medalsCount = olympic.participations.reduce((acc, current) => acc + current.medalsCount, 0);
      return { ...olympic, name: olympic.country, value: medalsCount };
    });    
  }

  onSelect(data: EventEmitter<any>): void {
    this.router.navigate(['/detail', data.name.toLocaleLowerCase()]);
  }

  tooltipText(myArc: any): string {
    this.label = formatLabel(myArc.data.name);
    this.val = formatLabel(myArc.data.value);

    return `
      <span class="tooltip-label">${escapeLabel(this.label)}</span>
      <span class="tooltip-val">${this.val}</span>
    `;
  }
}
