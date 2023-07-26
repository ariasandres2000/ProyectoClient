import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isAdmin = false;
  user: any;

  constructor(private storageService: StorageService, private route: Router) {
    this.validarSesion();
  }

  validarSesion() {
    if (!this.storageService.isLoggedIn()) {
      this.route.navigate(['/']);  
    } else {
      this.user = this.storageService.getUser();
      console.log(this.user)

      if (this.user.tipo == 'A')
        this.isAdmin = true;
    }
  }

  logOut() {
    this.route.navigate(['/']); 
    this.storageService.clean();
  }
  
}
