import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { GitUsersService } from './../shared/git-users.service';
import { User } from '../models';

@Component({
  templateUrl: './home.component.html',
   styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loading = false;
  users: any;
  results: any;
  searchTerm$ = new Subject<string>();
  constructor(private gitUserService: GitUsersService) {
    this.gitUserService.search(this.searchTerm$)
      .subscribe(results => {
        this.users = [];
        this.users = results;
      });
  }
  ngOnInit() {
    this.loading = true;
    this.users = [];
    this.gitUserService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users  = users;
    });
  }
}
