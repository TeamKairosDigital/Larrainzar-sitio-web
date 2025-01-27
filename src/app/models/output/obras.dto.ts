import { SafeResourceUrl } from "@angular/platform-browser";

export class obrasDto{
    id?: number = 0;
    nombre?: string = '';
    descripcion?: string = '';
    autor: string = '';
    imagenUrl: string = '';
    imagen?: SafeResourceUrl | null = null;
    fechaCreacion?: string = '';
}