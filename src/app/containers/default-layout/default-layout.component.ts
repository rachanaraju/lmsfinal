import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  constructor(private router:Router) { } 

  onlogout(){
    localStorage.removeItem("user_id");
    this.router.navigate(['/login']); 

  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
