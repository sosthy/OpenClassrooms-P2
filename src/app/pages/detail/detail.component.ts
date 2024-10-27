import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScaleType } from '@swimlane/ngx-charts';
import { filter, map, Observable, of, shareReplay, tap } from 'rxjs';
import { HeaderItem } from 'src/app/core/models/HeaderItem';
import { Olympic } from 'src/app/core/models/Olympic';
import Participation from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  olympic$!: Observable<Olympic>;
  items!: HeaderItem[];

  multi: any[] = [];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  autoScale: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
    name: '',
    selectable: true,
    group: ScaleType.Linear
  };

  constructor(private route: ActivatedRoute, private router: Router, private olympicService: OlympicService) {}

  ngOnInit(): void 
  {
    const countryName = this.route.snapshot.paramMap.get('country');    
    countryName ? this.getOlympic(countryName) : this.redirect();
  }

  getOlympic(countryName: string | null)
  {    
    this.olympic$ = this.olympicService.getOlympic(countryName).pipe(
      filter(olympic => olympic !== null && olympic !== undefined),
      map(this.buildChartData),
    );
  }

  buildChartData = (olympic: Olympic) => {        
    let totalMedals = 0, totalAthletes = 0, numberEntries = olympic.participations.length;    
    const series: any = [];

    olympic.participations.forEach((p: Participation) => { 
      totalMedals += p.medalsCount;  
      totalAthletes += p.athleteCount;
      series.push({name: p.year, value: p.medalsCount});
    });

    this.items = [{ title: "Number of entries", value: numberEntries }, { title: "Total number medals", value: totalMedals }, { title: "Total number of athletes", value: totalAthletes }];
    this.multi = [{ name: olympic.country, series }];

    return olympic;
  }

  public redirect() {
    this.router.navigate(['/not-found']);
  }

}
