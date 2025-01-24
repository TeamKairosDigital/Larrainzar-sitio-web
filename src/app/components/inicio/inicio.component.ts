import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ImportsModule } from '../../imports';
import { SideBarComponent } from '../tools/side-bar/side-bar.component';

import { InicioService } from '../../services/inicio.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { obrasDto } from '../../models/output/obras.dto';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ImportsModule, SideBarComponent, HttpClientModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  providers: [SideBarComponent]
})
export class InicioComponent implements OnInit{

  carrusel: any[] | undefined;
  iconosDatos: { svgUrl: SafeResourceUrl, desc: string }[] = [];
  @ViewChildren('icono') iconoElements: QueryList<any> | undefined;
  icono_casa: string = '';

  obras: obrasDto[] = [];  
  responsiveOptions: any[] | undefined;

  constructor(
    private inicioServices: InicioService, 
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.inicioServices.getImagesCarrusel().then((images) => (this.carrusel = images));

    this.iconosDatos = [
      {
        svgUrl: this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/intro/Prueba.svg'), // Marcamos la URL como segura
        desc: '484 km²',
      },
      {
        svgUrl: this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/intro/Prueba.svg'),
        desc: '19°',
      },
      {
        svgUrl: this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/intro/Prueba.svg'),
        desc: '484 años de Historia',
      },
      {
        svgUrl: this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/intro/Prueba.svg'),
        desc: '215,874 habitantes',
      },
    ];

    this.icono_casa = 'assets/img/intro/icono_casa.png';

    this.obras = [
      {
          image: 'assets/img/intro/C_1.jpg',
          name: 'nombre'
      },
      {
          image: 'assets/img/intro/C_1.jpg',
          name: 'nombre'
      },
      {
          image: 'assets/img/intro/C_1.jpg',
          name: 'nombre'
      },
      {
        image: 'assets/img/intro/C_1.jpg',
        name: 'nombre'
      },
      {
          image: 'assets/img/intro/C_1.jpg',
          name: 'nombre'
      },
      {
          image: 'assets/img/intro/C_1.jpg',
          name: 'nombre'
      }
    ];

    this.responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
  }

  ngAfterViewInit() {
    this.iconoElements?.forEach((icono) => {
      const svgElement = icono.nativeElement.contentDocument;
      if (svgElement) {
        const paths = svgElement.querySelectorAll('path');
        paths.forEach((path: any) => {
          path.setAttribute('fill', '#000000'); // Inicializa con el color negro
        });
      }
    });
  }

  // Cambia el color cuando se hace hover
  onHover(index: number, isHovering: boolean) {
    const iconoElement = this.iconoElements?.toArray()[index]?.nativeElement.contentDocument;
    if (iconoElement) {
      const paths = iconoElement.querySelectorAll('path');
      paths.forEach((path: any) => {
        if (isHovering) {
          path.setAttribute('fill', '#007bff'); // Cambia a otro color
        } else {
          path.setAttribute('fill', '#000000'); // Vuelve al color original al quitar el hover
        }
      });
    }
  }



}
