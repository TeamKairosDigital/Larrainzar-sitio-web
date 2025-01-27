import { Component } from '@angular/core';
import { ImportsModule } from '../../imports';
import { SideBarComponent } from '../tools/side-bar/side-bar.component';
import { FooterComponent } from '../tools/footer/footer.component';

@Component({
  selector: 'app-dif',
  standalone: true,
  imports: [ImportsModule, SideBarComponent, FooterComponent],
  templateUrl: './dif.component.html',
  styleUrl: './dif.component.scss',
  providers: [SideBarComponent, FooterComponent]
})
export class DifComponent {

}
