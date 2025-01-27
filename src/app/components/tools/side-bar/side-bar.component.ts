import { Component } from '@angular/core';
import { ImportsModule } from '../../../imports';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

}
