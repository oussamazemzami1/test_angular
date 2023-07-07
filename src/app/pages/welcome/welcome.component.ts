import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  name = "Oussama"

  constructor(private router: Router) { }

  navigateToDashboards() {
    this.router.navigate(['/dashboard'], { queryParams: { name: this.name } });
  }

}
