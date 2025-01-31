import { Component } from '@angular/core';
import { ImportsModule } from '../../imports';
import { SideBarComponent } from '../tools/side-bar/side-bar.component';
import { FooterComponent } from '../tools/footer/footer.component';
import { AvisoPrivacidadService } from '../../services/aviso-privacidad.service';
import { MessageService } from 'primeng/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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

  // Para ocultar el dialgo
  fileDialog: boolean = false;
  fileUrl: SafeResourceUrl | null = null;

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

  getArchivo(archivos: AvisoArchivoDto[], tipo: number): void {
    this.fileUrl = null;
    const archivo = archivos.find(archivo => archivo.tipo === tipo);
    if (archivo) {
      this.spinner = true;
      this.avisoPrivacidadService.getAvisoPrivacidadArchivoWEB(archivo.id).subscribe({
        next: (response) => {
          if (response.success) {

            if (response.data) {
              const blob = this.base64ToBlob(response.data, 'application/pdf');
              const url = URL.createObjectURL(blob);
              this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url); // Esto ahora usará un URL seguro
            }
            this.fileDialog = true;
            this.spinner = false;
          }
          // console.log(response);
        },
        error: (error) => {
          this.spinner = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al obtener el archivo de aviso de privacidad' });
        }
      });
    }
  }

  base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays: Uint8Array[] = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = Array.prototype.map.call(slice, (char) => char.charCodeAt(0)) as number[];
      byteArrays.push(new Uint8Array(byteNumbers));
    }
  
    return new Blob(byteArrays, { type: mimeType });
  }

  hideDialog() {
    this.fileDialog = false;
  }

}
