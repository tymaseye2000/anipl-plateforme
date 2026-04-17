import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Routes dynamiques : Forcer le mode Server pour éviter l'erreur getPrerenderParams
  {
    path: 'campagnes/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'campaigns/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'campagnes/:slug/participate',
    renderMode: RenderMode.Server
  },
  // Routes statiques
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];