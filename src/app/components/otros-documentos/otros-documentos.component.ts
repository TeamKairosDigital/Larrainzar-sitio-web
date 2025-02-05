import { Component } from '@angular/core';
import { ImportsModule } from '../../imports';
import { SideBarComponent } from '../tools/side-bar/side-bar.component';
import { FooterComponent } from '../tools/footer/footer.component';
import { MessageService } from 'primeng/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AvisoPrivacidadService } from '../../services/aviso-privacidad.service';
import { OtrosDocumentosDto } from '../../models/input/otrosDocumentos.dto';

@Component({
  selector: 'app-otros-documentos',
  standalone: true,
  imports: [ImportsModule, SideBarComponent, FooterComponent],
  templateUrl: './otros-documentos.component.html',
  styleUrl: './otros-documentos.component.scss',
  providers: [SideBarComponent, FooterComponent, MessageService]
})
export class OtrosDocumentosComponent {

  spinner = false;
  documentos: OtrosDocumentosDto[] = [];

  // Para ocultar el dialgo
  fileDialog: boolean = false;
  fileUrl: SafeResourceUrl | null = null;

  constructor(
    private avisoPrivacidadService: AvisoPrivacidadService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getOtrosDocumentos();
  }

  getOtrosDocumentos(): void {
    this.spinner = true;
    this.avisoPrivacidadService.getOtrosDocumentos().subscribe({
      next: (response) => {
        if (response.success) {
          this.documentos = response.data || [];
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

  getArchivo(archivos: OtrosDocumentosDto): void {
    this.fileUrl = null;
    if (archivos) {
      this.spinner = true;
      this.avisoPrivacidadService.getOtroDocumentorchivoWEB(archivos.id).subscribe({
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
