import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ImportsModule } from '../../imports';
import { SideBarComponent } from '../tools/side-bar/side-bar.component';

import { InicioService } from '../../services/inicio.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { obrasDto } from '../../models/output/obras.dto';
import { FooterComponent } from "../tools/footer/footer.component";
import { ObrasService } from '../../services/obras.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ImportsModule, SideBarComponent, HttpClientModule, FooterComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  providers: [SideBarComponent, FooterComponent, MessageService]
})
export class InicioComponent implements OnInit{

  spinner = false;
  carrusel: any[] | undefined;
  iconosDatos: { svgUrl: SafeResourceUrl, desc: string }[] = [];
  @ViewChildren('icono') iconoElements: QueryList<any> | undefined;
  icono_casa: string = '';

  obraSeleccionada: obrasDto = {
    autor: '',
    imagenUrl: '',
    descripcion: '',
    fechaCreacion: '',
    id: 0,
    imagen: '',
    nombre: ''
  }
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
      width: '300'
    },
    {
      image: 'assets/img/intro/inai-logo.png',
      name: 'inai',
      width: '300'
    },
    {
      image: 'assets/img/intro/itipch.png',
      name: 'itipch',
      width: '250'
    },
    {
      image: 'assets/img/intro/consulta.png',
      name: 'consulta',
      width: '300'
    },
    {
      image: 'assets/img/intro/SISTEMA-NACIONAL-DE-TRASNPARENCIA.png',
      name: 'SISTEMA-NACIONAL-DE-TRASNPARENCIA',
      width: '300'
    },
    {
      image: 'assets/img/intro/sevac.png',
      name: 'sevac',
      width: '150'
    }
  ];

  constructor(
    private inicioServices: InicioService, 
    private sanitizer: DomSanitizer,
    private obrasServices: ObrasService,
    private messageService: MessageService,
    private router: Router,
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

    this.getAllObras();
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


  // Obtener lista de obras
  getAllObras(): void {

    this.spinner = true;
    this.obrasServices.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          this.obras = response.data || [];
          this.obras.forEach(async (element) => {
            element.descripcion = this.sanitizer.bypassSecurityTrustHtml(element.descripcion || '') as unknown as string;
            const mimeType = this.detectMimeType(element.imagenUrl); // Detectar MIME dinámicamente
            const blob = this.base64ToBlob(element.imagenUrl, mimeType);
            const url = URL.createObjectURL(blob);
            element.imagen = this.sanitizer.bypassSecurityTrustResourceUrl(url); // Esto ahora usará un URL seguro

          });
          // console.log(this.obras);
          // this.messageService.add({ severity: 'success', summary: 'Guardado', detail: response.message, life: 10000 });
        } else {
          this.spinner = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 10000 });
        }
        this.spinner = false; // Detén el spinner en ambos casos
      },
      error: (error) => {
        // Maneja el error del backend y muestra un mensaje
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message || 'Error con el servidor',
          life: 10000
        });
        this.spinner = false; // Detén el spinner en caso de error
      },
    });

  }

  // conversion de base64 para archivos
  private base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays: Uint8Array[] = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = Array.prototype.map.call(slice, (char) =>
        char.charCodeAt(0)
      ) as number[];
      byteArrays.push(new Uint8Array(byteNumbers));
    }
  
    return new Blob(byteArrays, { type: mimeType });
  }
  
  // Detecta dinámicamente el MIME según el prefijo del Base64
  private detectMimeType(base64: string): string {
    if (base64.startsWith('/9j/')) {
      return 'image/jpeg';
    } else if (base64.startsWith('iVBORw0KGgo')) {
      return 'image/png';
    }
    return 'image/jpeg'; // Valor predeterminado
  }

  selectObra(obra: obrasDto): void {
    this.obraSeleccionada = { ...obra };
    this.router.navigate(['/obras', this.obraSeleccionada.id]);
    // console.log('Obra seleccionada:', this.obraSeleccionada);
  }

}
