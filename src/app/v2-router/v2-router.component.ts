import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, ParamMap, Router } from '@angular/router';

/**
 * Router Wrapper for all V2 Pages
 * 
 * The goal of this component is to be responsible for all logic around things like
 * "redirect to workspace menu if not logged into a workspace"
 * 
 * Child pages should be able to be more or less isolated from each other if this works
 */

@Component({
  selector: 'v2-router',
  templateUrl: './v2-router.component.html',
  styleUrls: ['./v2-router.component.scss']
})
export class V2RouterComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  whichComponent: string;

  currentUrl: string;
  currentParamMap: ParamMap;

  ngOnInit() {
    this.route.queryParamMap.subscribe((map: ParamMap) => {
      this.currentParamMap = map;
    });

    this.route.url.subscribe(url => this.urlHandler(url));
  }

  urlHandler(url) {
    this.currentUrl = url.join('/');

    let pagePath = '';
    if (url[1]) {
      pagePath = url[1].path;
    }

    switch (pagePath) {
      case 'workspace-selection':
        this.whichComponent = 'workspace-selection';
        break;
      default:
        this.whichComponent = 'action-menu';
    }
  }

}
