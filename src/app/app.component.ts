import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  router$ = inject(Router).events.pipe(filter(v => v instanceof NavigationEnd))
  route!: string

  constructor() {
    this.router$.subscribe((v: any) => {
      this.route = v.url
    })
  }
}
