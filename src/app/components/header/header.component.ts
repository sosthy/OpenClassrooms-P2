import { Component, Input } from '@angular/core';
import { HeaderItem } from 'src/app/core/models/HeaderItem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title = '';
  @Input() items: HeaderItem[] = [];
}
