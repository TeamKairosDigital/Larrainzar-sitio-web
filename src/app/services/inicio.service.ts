import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor(private http: HttpClient) { }

  getDataCarrusel() {
    return [
        {
          itemImageSrc: 'assets/img/intro/C_1.jpg',
          alt: 'Image 1',
        },
        {
          itemImageSrc: 'assets/img/intro/C_2.jpg',
          alt: 'Image 2',
        },
        {
          itemImageSrc: 'assets/img/intro/C_3.jpg',
          alt: 'Image 3',
        },
        {
          itemImageSrc: 'assets/img/intro/C_4.jpg',
          alt: 'Image 4',
        }
    ];
  }

  getImagesCarrusel() {
      return Promise.resolve(this.getDataCarrusel());
  }

//   getDataIconos() {
//     return [
//         {
//           svgUrl: 'assets/img/intro/Prueba.svg',
//           desc: 'Image 1',
//         },
//         {
//           svgUrl: 'assets/img/intro/Prueba.svg',
//           desc: 'Image 1',
//         },
//         {
//           svgUrl: 'assets/img/intro/Prueba.svg',
//           desc: 'Image 1',
//         },
//         {
//           svgUrl: 'assets/img/intro/Prueba.svg',
//           desc: 'Image 1',
//         }
//     ];
//   }

//   getImagesIconos() {
//     return Promise.resolve(this.getDataIconos());
// }
  // Cargar el contenido SVG de un archivo
  // Cargar el contenido SVG de un archivo

}
