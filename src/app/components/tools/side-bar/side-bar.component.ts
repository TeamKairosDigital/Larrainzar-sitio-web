import { Component, HostListener, ViewChild } from '@angular/core';
import { ImportsModule } from '../../../imports';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  sidebarVisible: boolean = false;
  // isMobile = false;

  // @HostListener('window:resize', ['$event'])
  // onResize() {
  //   this.checkScreenSize();
  // }

  // private checkScreenSize() {
  //   this.isMobile = window.innerWidth <= 1024;
  // }

  closeCallback(e: Event): void {
      this.sidebarRef.close(e);
  }


}
