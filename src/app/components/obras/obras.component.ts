import { Component } from '@angular/core';
import { ImportsModule } from '../../imports';
import { SideBarComponent } from '../tools/side-bar/side-bar.component';
import { FooterComponent } from '../tools/footer/footer.component';
import { obrasDto } from '../../models/output/obras.dto';
import { ObrasService } from '../../services/obras.service';
import { MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-obras',
  standalone: true,
  imports: [ImportsModule, SideBarComponent, FooterComponent, HttpClientModule],
  templateUrl: './obras.component.html',
  styleUrl: './obras.component.scss',
  providers: [SideBarComponent, FooterComponent, MessageService]
})
export class ObrasComponent {

    idObra: number = 0;
    spinner = false;
    obras: obrasDto[] = [];
    obraSeleccionada: obrasDto = {
      autor: '',
      imagenUrl: '',
      descripcion: '',
      fechaCreacion: '',
      id: 0,
      imagen: '',
      nombre: ''
    }
    responsiveOptions: any[] | undefined;

    constructor(
      private obrasServices: ObrasService,
      private messageService: MessageService,
      private sanitizer: DomSanitizer,
      private route: ActivatedRoute
    ) { }

    ngOnInit() {

      this.route.params.subscribe(params => {
        this.idObra = params['idObra'];
        // this.selectObraURL();  
      });

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
              element.descripcion = this.sanitizer.bypassSecurityTrustHtml(element.descripcion || '') as unknown as string;
              const mimeType = this.detectMimeType(element.imagenUrl); // Detectar MIME dinámicamente
              const blob = this.base64ToBlob(element.imagenUrl, mimeType);
              const url = URL.createObjectURL(blob);
              element.imagen = this.sanitizer.bypassSecurityTrustResourceUrl(url); // Esto ahora usará un URL seguro

            });

            // Seleccionar el último elemento del array
            this.selectObraURL();
            // console.log(this.obras);
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

    // Método para seleccionar una obra del carrusel
    selectObra(obra: obrasDto): void {
      this.obraSeleccionada = { ...obra };
      //console.log('Obra seleccionada:', this.obraSeleccionada);
    }

    private selectObraURL(){
      // console.log(this.obras.length)
      // console.log(this.idObra)
      if (this.obras.length > 0 && this.idObra == 0) {
        const ultimaObra = this.obras[this.obras.length - 1];
        this.selectObra(ultimaObra); // Pasar el último elemento a selectObra
      }else{
        // Seleccionar obra con con el id idObra y obras: obrasDto[] = [];
        const obra = this.obras.find(o => o.id === Number(this.idObra));
        if (obra) {
          this.selectObra(obra);
        }
      }
    }

}
