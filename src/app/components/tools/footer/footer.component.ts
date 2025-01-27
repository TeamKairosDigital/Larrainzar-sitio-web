import { Component } from '@angular/core';
import { ImportsModule } from '../../../imports';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
