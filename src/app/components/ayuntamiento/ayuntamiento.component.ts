import { ChangeDetectorRef, Component } from '@angular/core';
import { ImportsModule } from '../../imports';
import { SideBarComponent } from '../tools/side-bar/side-bar.component';
import { FooterComponent } from '../tools/footer/footer.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ayuntamiento',
  standalone: true,
  imports: [ImportsModule, SideBarComponent, FooterComponent],
  templateUrl: './ayuntamiento.component.html',
  styleUrl: './ayuntamiento.component.scss',
  providers: [SideBarComponent, FooterComponent]
})
export class AyuntamientoComponent {

  activeIndex: number = 0;
  tipo: string = '';
  persons: { name: string; role: string; phone: string; email: string; image: string; }[] = [];

  presidente = [
    {
      name: 'Andrés Ruiz Gómez',
      role: 'Presidente Municipal',
      phone: '(999) 444 1234',
      email: 'presidente@larrainzar.gob.mx',
      image: 'assets/img/ayuntamiento/prueba_2.jpg'
    }
  ];

  cabildo = [
    {
      name: 'José Luis Pérez',
      role: 'Síndico Municipal',
      phone: '(999) 444 1234',
      email: 'cabildo@larrainzar.gob.mx',
      image: 'assets/img/ayuntamiento/prueba_2.jpg'
    },
    {
      name: 'Ángel Hernández',
      role: 'Síndico Municipal',
      phone: '(999) 333 5678',
      email: 'finanzas@larrainzar.gob.mx',
      image: 'assets/img/ayuntamiento/prueba.jpg'
    },
    {
      name: 'Liliana Hernández',
      role: 'Síndico Municipal',
      phone: '(999) 444 1234',
      email: 'cabildo@larrainzar.gob.mx',
      image: 'assets/img/ayuntamiento/prueba_2.jpg'
    },
    {
      name: 'Luis Eduardo',
      role: 'Síndico Municipal',
      phone: '(999) 333 5678',
      email: 'cabildo@larrainzar.gob.mx',
      image: 'assets/img/ayuntamiento/prueba.jpg'
    }
  ];

  directorio = [
    {
      name: 'Liliana Hernández',
      role: 'Tesorera Municipal',
      phone: '(999) 444 1234',
      email: 'presidente@larrainzar.gob.mx',
      image: 'assets/img/ayuntamiento/prueba_2.jpg'
    },
    {
      name: 'Carlos Pérez',
      role: 'Director de Finanzas',
      phone: '(999) 333 5678',
      email: 'finanzas@larrainzar.gob.mx',
      image: 'assets/img/ayuntamiento/prueba.jpg'
    }
  ];

  constructor(
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro 'tipo' de la URL
    this.route.params.subscribe(params => {
      this.tipo = params['tipo'];
      // console.log('Tipo:', this.tipo);  // Verificar el cambio del parámetro
      this.updatePersonsList();  // Llamar a la función para actualizar la lista de personas
    });
  }
  
  updatePersonsList() {
    switch (this.tipo) {
      case 'presidente':
        this.persons = this.presidente;
        break;
      case 'cabildo':
        this.persons = this.cabildo;
        break;
      case 'directorio':
        this.persons = this.directorio;
        break;
    }
  }

  // Función para cambiar el índice activo de las miniaturas
  setActiveIndex(index: number) {
    this.activeIndex = index;
    this.cdRef.detectChanges();  // Forzar la detección de cambios para sincronizar
  }
}
