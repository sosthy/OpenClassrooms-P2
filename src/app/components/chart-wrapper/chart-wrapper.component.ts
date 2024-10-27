import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-chart-wrapper',
  templateUrl: './chart-wrapper.component.html',
  styleUrl: './chart-wrapper.component.scss'
})
export class ChartWrapperComponent {
  @ContentChild('chartTemplate') chartTemplate!: TemplateRef<any>;
}
