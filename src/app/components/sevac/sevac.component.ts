import { Component } from '@angular/core';
import { ImportsModule } from '../../imports';
import { SideBarComponent } from '../tools/side-bar/side-bar.component';
import { FooterComponent } from '../tools/footer/footer.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SevacService } from '../../services/sevac.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DocumentosFiltrosDto } from '../../models/output/DocumentosFiltros.dto';
import { periodoDto } from '../../models/input/periodo.dto';
import { DocumentosDto } from '../../models/input/Documentos.dto';
import { yearsDto } from '../../models/years.dto';
import { ley } from '../../models/ley.dto';
import { ModalData } from '../../models/ModalData';

@Component({
  selector: 'app-sevac',
  standalone: true,
  imports: [ImportsModule, SideBarComponent, FooterComponent],
  templateUrl: './sevac.component.html',
  styleUrl: './sevac.component.scss',
  providers: [SideBarComponent, FooterComponent, MessageService, ConfirmationService]
})
export class SevacComponent {

  spinner: boolean = false;
  isDisabled: boolean = true;

  DocumentosFiltros: DocumentosFiltrosDto;

  periods: periodoDto[] = [];
  displayedColumns: string[] = [];

  years: yearsDto[] = [
    { value: '2024', viewValue: '2024' },
    { value: '2025', viewValue: '2025' },
    { value: '2026', viewValue: '2026' },
    { value: '2027', viewValue: '2027' },
  ];

  selectedYear: yearsDto | any;

  leyes: ley[] = [
    { value: '-1', viewValue: 'Todos' },
    { value: 'LGCG', viewValue: 'LGCG' },
    { value: 'DF', viewValue: 'DF' },
  ];

  selectedLey: ley | any;

  tiposDocumentos: ley[] = [
    { value: '-1', viewValue: 'Todos' },
    { value: '1', viewValue: 'SEVAC' },
    { value: '2', viewValue: 'SRFT' },
  ];

  archivoSeleccionado: ModalData = new ModalData;

  documentos: DocumentosDto[] = [];

  first = 0;
  rows = 10;

  // Para ocultar el dialgo
  fileDialog: boolean = false;

  // Almacena el archivo seleccionado
  selectedFile: File | null = null;
  fileUrl: SafeResourceUrl | null = null;

  // Objeto para enviar archivo nuevo
  // createFileDto: createFileDto = {
  //   idArchivo: 0,
  //   nombreArchivo: '',
  //   documentoId: 0,
  //   periodoId: 0,
  //   anualidad: '',
  //   archivo: null,
  //   usuarioCreacionId: 0,
  //   municipality_id: 0
  // };

  // Variable para definir si es nuevo archivo para ocultar cierto botones
  EsNuevo: boolean = false;

  sanitizedUrl: SafeResourceUrl | null = null;

  currentYear: string = '';

  constructor(
    private documentosService: SevacService,
    private sanitizer: DomSanitizer,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {
    const today = new Date();
    this.currentYear = today.getFullYear().toString();

    this.DocumentosFiltros = {
      documento: '',
      year: this.currentYear,
      ley: '-1'
    }
  }

  ngOnInit() {

    this.selectedYear = this.years.find(year => year.value === this.currentYear);
    this.selectedLey = this.leyes.find(ley => ley.value === '-1');

    //Obtenemos la lista de periodos
    this.getPeriodos();

    //Obtenemos la lista para los documentos juntos con sus archivos existentes
    this.getDocuments(this.DocumentosFiltros);

  }

  getDocuments(data: DocumentosFiltrosDto): void {
    this.spinner = true;
    this.documentosService.getDocumentsWithFiles(data).subscribe((response) => {
      if (response.success && response.data) {
        this.documentos = response.data;
      }
      this.spinner = false;
    });
  }

  getPeriodos(): void {
    this.documentosService.getPeriodos().subscribe((response) => {
      if (response.success && response.data) {
        this.periods = response.data;
        const periodNames = this.periods.map(period => period.nombrePeriodo);
        this.setupColumns(periodNames);
      }
    })
  }

  setupColumns(periodNames: string[]): void {
    this.displayedColumns = [
      'nombreDocumento', 'ley', 'categoria',
      ...periodNames.map(period => `period_${period}`)
    ];
  }

  onInputChange(value: string) {
    if (value.length >= 5 || value.length == 0) { // Ejecuta la función después de 3 caracteres
      this.onChange(value, 'documento');
    }
  }

  onChange(event: any, filtro: string): void {

    switch (filtro) {
      case 'year':
        this.DocumentosFiltros.year = event.value.value;
        break;
      case 'leyes':
        this.DocumentosFiltros.ley = event.value.value;
        break
      case 'documento':
        this.DocumentosFiltros.documento = event;
        break
    }

    this.getDocuments(this.DocumentosFiltros);
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.documentos ? this.first === this.documentos.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.documentos ? this.first === 0 : true;
  }

  hasFileForPeriod(element: any, period: string): boolean {
    return element.archivos.some((archivo: any) => archivo.periodo === period);
  }

  openFileModal(document: DocumentosDto, period: periodoDto, nuevo: boolean): void {
    this.selectedFile = null;
    this.fileUrl = null;

    this.archivoSeleccionado.IdDocumento = document.id;
    this.archivoSeleccionado.Anualidad = this.selectedYear.value;
    this.archivoSeleccionado.IdArchivo = 0;
    this.archivoSeleccionado.NombreDocumento = document.nombreDocumento;
    this.archivoSeleccionado.PeriodoNombre = period.nombrePeriodo;
    this.archivoSeleccionado.PeriodoId = period.id;

    if (!nuevo) {

      let documentoSeleccionado = document.archivos.filter(archivo => archivo.periodo === period.nombrePeriodo);
      this.archivoSeleccionado.IdArchivo = documentoSeleccionado[0].id;
      // this.createFileDto.idArchivo = this.archivoSeleccionado.IdArchivo;
      this.EsNuevo = false;

      if (this.archivoSeleccionado.IdArchivo > 0) {
        this.getFileBase64(this.archivoSeleccionado.IdArchivo);
        // this.createFileDto.idArchivo = this.archivoSeleccionado.IdArchivo;
      }

    } else {
      this.EsNuevo = true;
    }

    // this.createFileDto.documentoId = document.id;
    // this.createFileDto.periodoId = period.id;
    // this.createFileDto.anualidad = this.selectedYear.value;


    this.fileDialog = true;
  }

  getFileBase64(id: number): void {
    this.spinner = true;
    this.documentosService.getFileBase64(id).subscribe({
      next: (response) => {
        const base64 = response.data?.base64;
        if (base64) {
          const blob = this.base64ToBlob(base64, 'application/pdf');
          const url = URL.createObjectURL(blob);
          this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url); // Esto ahora usará un URL seguro
          this.spinner = false;
        }
      },
      error: (err) => {
        console.error('Error fetching file base64', err);
        this.spinner = false;
      }
    });
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

  verArchivo() {
    // const idArchivo = this.archivoSeleccionado.IdArchivo;
    // const url = this.router.serializeUrl(
    //   this.router.createUrlTree(['/pdfview'], { queryParams: { idPdf: idArchivo } })
    // );
    // window.open(url, '_blank');

    // const idArchivo = this.archivoSeleccionado.IdArchivo;
    // const url = this.router.serializeUrl(
    //   this.router.createUrlTree(['/pdfview', idArchivo])
    // );
    // window.open(url, '_blank');

    const idArchivo = this.archivoSeleccionado.IdArchivo;
    const url = `${window.location.origin}/pdfview/${idArchivo}`;
    window.open(url, '_blank');
  }

}
