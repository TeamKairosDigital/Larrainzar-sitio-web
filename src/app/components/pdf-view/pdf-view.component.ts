import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SevacService } from '../../services/sevac.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { ImportsModule } from '../../imports';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pdf-view',
  standalone: true,
  imports: [ImportsModule, HttpClientModule],
  templateUrl: './pdf-view.component.html',
  styleUrl: './pdf-view.component.scss',
  providers: [MessageService]
})
export class PdfViewComponent {

  spinner = false;
  idPdf: number = 0;
  fileUrl: SafeResourceUrl | null = null;

  constructor(
    private sevacServices: SevacService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {

    // this.route.params.subscribe(params => {
    //   this.idPdf = params['idPdf'];
    //   // this.selectObraURL();  
    //   this.getFile();
    // });
    this.route.paramMap.subscribe(params => {
      const data = params.get('idPdf');  
      this.idPdf = Number(data);  
      this.getFile();
    });

  }


  getFile(){
    this.spinner = true; // Muestra el spinner mientras se procesa la solicitud
    this.sevacServices.getFileBase64(this.idPdf).subscribe({
      next: (response) => {
        if (response.success) {
          // this.archivoBase64 = response.data; // Aquí obtienes el archivo en base64
          // console.log('Archivo en base64:', this.archivoBase64);

            if (response.data && response.data.base64) {
              const blob = this.base64ToBlob(response.data.base64, 'application/pdf');
              const url = URL.createObjectURL(blob);
              this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url); // Esto ahora usará un URL seguro
            } else {
              this.messageService.add({
                severity: 'error', 
                summary: 'Error', 
                detail: response.message, 
                life: 5000 
              });
            }
          // const url = URL.createObjectURL(blob);
          // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url); // Esto ahora usará un URL seguro
          this.spinner = false;
          // this.messageService.add({ 
          //   severity: 'success', 
          //   summary: 'Éxito', 
          //   detail: 'Archivo recuperado con éxito', 
          //   life: 5000 
          // });
        } else {
          this.messageService.add({
            severity: 'error', 
            summary: 'Error', 
            detail: response.message, 
            life: 5000 
          });
        }
        this.spinner = false; // Detén el spinner en ambos casos
      },
      error: (error) => {
        console.error('Error en la solicitud:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message || 'Error al recuperar el archivo',
          life: 5000
        });
        this.spinner = false; // Detén el spinner en caso de error
      },
      complete: () => {
        console.log('La solicitud ha sido completada.');
      }
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
  

}
