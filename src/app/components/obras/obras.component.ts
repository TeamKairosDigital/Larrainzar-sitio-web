import { Component } from '@angular/core';
import { ImportsModule } from '../../imports';
import { SideBarComponent } from '../tools/side-bar/side-bar.component';
import { FooterComponent } from '../tools/footer/footer.component';

@Component({
  selector: 'app-obras',
  standalone: true,
  imports: [ImportsModule, SideBarComponent, FooterComponent],
  templateUrl: './obras.component.html',
  styleUrl: './obras.component.scss',
  providers: [SideBarComponent, FooterComponent]
})
export class ObrasComponent {

}
