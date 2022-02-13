import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-repo-listing',
  templateUrl: './repo-listing.component.html',
  styleUrls: ['./repo-listing.component.css']
})
export class RepoListingComponent implements OnInit {

  @Input() public repo: any[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
