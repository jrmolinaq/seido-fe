import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public auth: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
