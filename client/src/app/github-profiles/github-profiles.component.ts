import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { GitUsersService } from './../shared/git-users.service';

@Component({
  selector: 'app-github-profiles',
  templateUrl: './github-profiles.component.html',
  styleUrls: ['./github-profiles.component.css']
})
export class GithubProfilesComponent implements OnInit {
  profile: any;
  repos : any;

  constructor(private gitUsersService: GitUsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const name = params.get('name');
        this.getGitProfile(name);
        this.getUserRepos(name);
      }
    );
  }

  getGitProfile(name): void {
    this.gitUsersService.getProfile(name).pipe(first()).subscribe(profile => {
      this.profile = profile;
    });
  }

  getUserRepos(name): void {
    this.gitUsersService.getGitRepos(name).pipe(first()).subscribe(repos => {
      this.repos = repos;
    });
  }

}
