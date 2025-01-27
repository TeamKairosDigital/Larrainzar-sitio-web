import { Component } from '@angular/core';
import { ImportsModule } from '../../imports';
import { SideBarComponent } from '../tools/side-bar/side-bar.component';
import { FooterComponent } from '../tools/footer/footer.component';
import { obrasDto } from '../../models/output/obras.dto';
import { ObrasService } from '../../services/obras.service';
import { MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-obras',
  standalone: true,
  imports: [ImportsModule, SideBarComponent, FooterComponent],
  templateUrl: './obras.component.html',
  styleUrl: './obras.component.scss',
  providers: [SideBarComponent, FooterComponent, MessageService]
})
export class ObrasComponent {

    spinner = false;
    obras: obrasDto[] = [];
    responsiveOptions: any[] | undefined;

    constructor(
      private obrasServices: ObrasService,
      private messageService: MessageService,
      private sanitizer: DomSanitizer,
    ) { }

    ngOnInit() {
      this.getAllObras();
    }

    // Obtener lista de obras
    getAllObras(): void {
      this.spinner = true;
      this.obrasServices.getAll().subscribe({
        next: (response) => {
          if (response.success) {
            this.obras = response.data || [];
            this.obras.forEach(async (element) => {

              const mimeType = this.detectMimeType(element.imagenUrl); // Detectar MIME dinámicamente
              const blob = await this.base64ToBlob(element.imagenUrl, mimeType);
              const url = URL.createObjectURL(await blob);
              element.imagen = this.sanitizer.bypassSecurityTrustResourceUrl(url); // Esto ahora usará un URL seguro

            });
            console.log(this.obras);
            // this.messageService.add({ severity: 'success', summary: 'Guardado', detail: response.message, life: 10000 });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message, life: 10000 });
          }
          this.spinner = false; // Detén el spinner en ambos casos
        },
        error: (error) => {
          // Maneja el error del backend y muestra un mensaje
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message || 'Error al crear el empleado',
            life: 10000
          });
          this.spinner = false; // Detén el spinner en caso de error
        },
      });

    }


    // conversion de base64 para archivos
    private async base64ToBlob(base64: string, mimeType: string): Promise<Blob> {
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

    private detectMimeType(base64: string): string {
      if (base64.startsWith('/9j/')) {
        return 'image/jpeg';
      } else if (base64.startsWith('iVBORw0KGgo')) {
        return 'image/png';
      }
      return 'image/jpeg'; // Valor predeterminado
    }

}
