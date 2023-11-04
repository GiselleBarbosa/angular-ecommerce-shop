import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ToolbarModule],
  template: `<p-toolbar>
    <div class="p-toolbar-group-start m-auto h-1rem">
      <p>&copy;2023 Angular Shopping | Giselle Barbosa</p>
    </div>
  </p-toolbar> `,
})
export class FooterComponent {}
