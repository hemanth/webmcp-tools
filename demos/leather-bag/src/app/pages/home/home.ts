import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private router: Router) {}

  onSearch(event: any) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const query = new FormData(form).get('query');
    this.router.navigate(['/search'], { queryParams: { q: query } });
    
    if (event.respondWith) {
      event.respondWith(Promise.resolve({ success: true, message: `Navigated to search results for ${query}` }));
    }
  }
}
