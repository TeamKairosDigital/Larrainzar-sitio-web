export class AvisoArchivoDto {
    id: number = 0;
    nombreArchivo: string = '';
    nombre: string = '';
    tipo: number = 0;
    activo: boolean = false; 
    fechaCreacion: string = '';
}
  
export class AvisoPrivacidadDto {
    id: number = 0;
    nombre: string = '';
    activo: boolean = false;
    fechaCreacion: string = '';
    archivos: AvisoArchivoDto[] = [];
}
  