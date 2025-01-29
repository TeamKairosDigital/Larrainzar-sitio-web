import { Component } from '@angular/core';
import { ImportsModule } from '../../imports';
import { SideBarComponent } from '../tools/side-bar/side-bar.component';
import { FooterComponent } from '../tools/footer/footer.component';
import { AvisoPrivacidadService } from '../../services/aviso-privacidad.service';
import { MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { AvisoArchivoDto, AvisoPrivacidadDto } from '../../models/input/avisoPrivacidad.dto';

@Component({
  selector: 'app-aviso-privacidad',
  standalone: true,
  imports: [ImportsModule, SideBarComponent, FooterComponent],
  templateUrl: './aviso-privacidad.component.html',
  styleUrl: './aviso-privacidad.component.scss',
  providers: [SideBarComponent, FooterComponent, MessageService]
})
export class AvisoPrivacidadComponent {

  spinner = false;
  obras: AvisoPrivacidadDto[] = [];

  constructor(
    private avisoPrivacidadService: AvisoPrivacidadService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getListAvisoPrivacidad();
  }

  // Obtener lista de aviso de privacidad
  getListAvisoPrivacidad(): void {
    this.spinner = true;
    this.avisoPrivacidadService.getListAvisoPrivacidad().subscribe({
      next: (response) => {
        if (response.success) {
          this.obras = response.data || [];
          this.spinner = false;
        }
        // console.log(response);
      },
      error: (error) => {
        this.spinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al obtener la lista de aviso de privacidad' });
      }
    });
  }

  tieneArchivoTipo(archivos: AvisoArchivoDto[], tipo: number): boolean {
    return archivos.some(archivo => archivo.tipo === tipo);
  }

  descargarArchivo(archivos: AvisoArchivoDto[], tipo: number): void {
    const archivo = archivos.find(archivo => archivo.tipo === tipo);
    if (archivo) {
      this.spinner = true;
      this.avisoPrivacidadService.getAvisoPrivacidadArchivoWEB(archivo.id).subscribe({
        next: (response) => {
          if (response.success) {
            const linkSource = `data:application/pdf;base64,${response.data}`;
            const downloadLink = document.createElement('a');
            const fileName = archivo.nombreArchivo;

            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
            this.spinner = false;
          }
          // console.log(response);
        },
        error: (error) => {
          this.spinner = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al obtener la lista de aviso de privacidad' });
        }
      });
    }
  }

}
