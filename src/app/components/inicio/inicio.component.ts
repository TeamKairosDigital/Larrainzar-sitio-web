import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ImportsModule } from '../../imports';
import { SideBarComponent } from '../tools/side-bar/side-bar.component';

import { InicioService } from '../../services/inicio.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { obrasDto } from '../../models/output/obras.dto';
import { FooterComponent } from "../tools/footer/footer.component";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ImportsModule, SideBarComponent, HttpClientModule, FooterComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  providers: [SideBarComponent, FooterComponent]
})
export class InicioComponent implements OnInit{

  carrusel: any[] | undefined;
  iconosDatos: { svgUrl: SafeResourceUrl, desc: string }[] = [];
  @ViewChildren('icono') iconoElements: QueryList<any> | undefined;
  icono_casa: string = '';

  obras: obrasDto[] = [];  
  responsiveOptions: any[] | undefined;

  serviciosDIF = [
    {
      image: 'assets/img/intro/destacado_1.png',
      name: 'DIF',
      desc: 'Servicio 1'
    },
    {
      image: 'assets/img/intro/destacado_2.png',
      name: 'DIF',
      desc: 'Servicio 2'
    },
    {
      image: 'assets/img/intro/destacado_3.png',
      name: 'DIF',
      desc: 'Servicio 3'
    }
  ];

  empresasLogo = [
    {
      image: 'assets/img/intro/transparencia.png',
      name: 'transparencia',
    },
    {
      image: 'assets/img/intro/inai-logo.png',
      name: 'inai',
    },
    {
      image: 'assets/img/intro/itipch.png',
      name: 'itipch',
    },
    {
      image: 'assets/img/intro/consulta.png',
      name: 'consulta',
    },
    {
      image: 'assets/img/intro/SISTEMA-NACIONAL-DE-TRASNPARENCIA.png',
      name: 'SISTEMA-NACIONAL-DE-TRASNPARENCIA',
    },
    {
      image: 'assets/img/intro/Archivo_General_de_la_Nación_logo.jpg',
      name: 'Archivo_General_de_la_Nación_logo',
    }
  ];

  constructor(
    private inicioServices: InicioService, 
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.inicioServices.getImagesCarrusel().then((images) => (this.carrusel = images));

    this.iconosDatos = [
      {
        svgUrl: this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/intro/ICONO_CAMPO.svg'), // Marcamos la URL como segura
        desc: '484 km²',
      },
      {
        svgUrl: this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/intro/ICONO_CLIMA.svg'),
        desc: '19°',
      },
      {
        svgUrl: this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/intro/ICONO_MANOS.svg'),
        desc: '484 años de Historia',
      },
      {
        svgUrl: this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/intro/ICONO_GENTE.svg'),
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
          path.setAttribute('fill', '#919191'); // Inicializa con el color negro
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
          path.setAttribute('fill', '#0745BF'); // Cambia a otro color
        } else {
          path.setAttribute('fill', '#919191'); // Vuelve al color original al quitar el hover
        }
      });
    }
  }



}
