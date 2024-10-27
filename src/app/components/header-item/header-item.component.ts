import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-item',
  templateUrl: './header-item.component.html',
  styleUrl: './header-item.component.scss'
})
export class HeaderItemComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
}
