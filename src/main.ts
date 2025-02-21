import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// bootstrapApplication(AppComponent, {
//   ...appConfig,
//   providers: [
//     ...appConfig.providers,
//     provideRouter(routes),
//     provideAnimations(),  // Agregando BrowserAnimationsModule aquí
//     provideHttpClient(
//       withFetch()  // Habilitando el uso de fetch
//     ),
//   ]
// })
//   .catch((err) => console.error(err));