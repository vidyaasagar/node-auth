import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { User } from '../models';
import { environment } from '../../environments/environment';

@Injectable()
export class GitUsersService {

  gitUsers = [];
  baseUrl = `${environment.apiUrl}/search/users`;
  queryUrl = '?q=';

  constructor(private http: HttpClient) { }

  public search(terms: Observable<string>) {
    return terms.debounceTime(1000)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  public searchEntries(term) {
    return this.http
      .get(this.baseUrl + this.queryUrl + term)
      .map((res) => {
        const arr = [];
        arr.push(res);
        console.log(arr[0].items);
        return arr[0].items;
      });
  }

  public getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users?since=15`);
  }

  public getProfile(name) {
    return this.http.get<User>(`${environment.apiUrl}/users/${name}`);
  }

  public getGitRepos(name) {
    return this.http.get<User>(`${environment.apiUrl}/users/${name}/repos`);
  }
}
