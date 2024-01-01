import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ToolbarModule],
  template: `<p-toolbar>
    <div class="p-toolbar-group-start m-auto h-1rem">
      <p>&copy;{{ currentYear }} Angular Shopping | Giselle Barbosa</p>
    </div>
  </p-toolbar> `,
})
export class FooterComponent {
  public currentYear: number;

  constructor() {
    const date = new Date();
    this.currentYear = date.getFullYear();
  }
}
