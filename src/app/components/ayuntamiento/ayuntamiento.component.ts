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
      email: 'andressruiz87@gmail.com',
      image: 'assets/img/ayuntamiento/prueba.jpg'
    }
  ];

  cabildo = [
    {
      name: 'maria teresa ruiz santiz',
      role: 'síndico',
      phone: '(999) 444 1234',
      email: 'rusantizmariateresa@gmail.com',
      image: 'assets/img/ayuntamiento/prueba_2.jpg'
    },
    {
      name: 'bartolo diaz diaz',
      role: 'tesorero',
      phone: '(999) 333 5678',
      email: 'bardiazdiaz79@outlook.com',
      image: 'assets/img/ayuntamiento/prueba.jpg'
    },
    {
      name: 'alfonso hermilo hernandez perez',
      role: 'primer regidor',
      phone: '(999) 444 1234',
      email: 'alfo_hp@hotmail.com',
      image: 'assets/img/ayuntamiento/prueba.jpg'
    },
    {
      name: 'andrea marcela teratol gomez',
      role: '2da regidora',
      phone: '(999) 333 5678',
      email: 'teegaa98@gmail.com',
      image: 'assets/img/ayuntamiento/prueba_2.jpg'
    },
    {
      name: 'marcelino ruiz lopez',
      role: '3er regidor',
      phone: '(999) 333 5678',
      email: 'Linoruiz1@hotmail.com',
      image: 'assets/img/ayuntamiento/prueba.jpg'
    },
    {
      name: 'andrea lopez gonzalez',
      role: '4ta regidora',
      phone: '(999) 333 5678',
      email: 'andrea06111975@gmail.com',
      image: 'assets/img/ayuntamiento/prueba_2.jpg'
    },
    {
      name: 'jose luis diaz diaz',
      role: '5to regidor',
      phone: '(999) 333 5678',
      email: 'diazdiazjoseluis465@gmail.com',
      image: 'assets/img/ayuntamiento/prueba.jpg'
    },
    {
      name: 'maria juliana diaz nuñez',
      role: '1er reg. suplente',
      phone: '(999) 333 5678',
      email: 'mjuliadn.25@gmail.com',
      image: 'assets/img/ayuntamiento/prueba_2.jpg'
    },
    {
      name: 'juan hernandez diaz',
      role: '2do reg. suplente',
      phone: '(999) 333 5678',
      email: 'herjuandiaz65@gmail.com',
      image: 'assets/img/ayuntamiento/prueba.jpg'
    },
    {
      name: 'victoria lopez diaz',
      role: '3er reg. suplente',
      phone: '(999) 333 5678',
      email: 'agroinsumoslarrainzar@gmail.com',
      image: 'assets/img/ayuntamiento/prueba_2.jpg'
    },
    {
      name: 'manuel nuñez gomez',
      role: 'regidor plurinominal',
      phone: '(999) 333 5678',
      email: 'gomez_1521@hotmail.com',
      image: 'assets/img/ayuntamiento/prueba.jpg'
    },
    {
      name: 'maria magdalena hernandez diaz',
      role: 'regidor plurinominal',
      phone: '(999) 333 5678',
      email: 'mag.mk.94@gmal.com',
      image: 'assets/img/ayuntamiento/prueba_2.jpg'
    },
    {
      name: 'antonia lopez lopez',
      role: 'regidor plurinominal',
      phone: '(999) 333 5678',
      email: 'antonia2023110995@gmail.com',
      image: 'assets/img/ayuntamiento/prueba_2.jpg'
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
