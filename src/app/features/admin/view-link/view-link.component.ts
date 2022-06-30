import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { HeroIconName } from 'ng-heroicon';
import { LinkType } from 'src/app/core/model/enum-front';
import { Link, TableHeader } from 'src/app/core/model/model-front';
import { LinkService } from 'src/app/core/services/link.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-view-link',
  templateUrl: './view-link.component.html',
  styleUrls: ['./view-link.component.css']
})
export class ViewLinkComponent implements OnInit {

  public linkHeader!: TableHeader[];
  public links: Link[] = [];
  public gameId!: typeof uuid;
  public icon: HeroIconName = 'link'
  public tableOptions = {
    misc: {
      icon: this.icon,
      view: false
    },
    edit: true,
    delete: true
  }

  constructor(private linkService: LinkService, private router: Router, private route: ActivatedRoute, private toast: HotToastService) { }

  ngOnInit(): void {
    this.setGameId();
    this.setHeader();
    this.getLinksByGameId();
  }

  private setHeader(): void {
    this.linkHeader = [
      {
        displayLabel: 'Link Type',
        key: 'linkType'
      },
      {
        displayLabel: 'Link',
        key: 'link'
      }
    ];
  }

  private getLinksByGameId() {
    this.linkService.getLinksByGameId(this.gameId).pipe(
      this.toast.observe(
        {
          loading: 'Loading links...',
          success: 'Links loaded',
          error: 'Loading links failed',

        }
      )
    ).subscribe((links: Link[]) => {
      this.setTableBody(links);
    })
  }

  private setTableBody(links: Link[]) {
    this.links = links.map((link: Link) => {
      const linkItem = {} as Link;
      linkItem.id = link.id;
      linkItem.link = link.link;
      linkItem.linkType = Object.values(LinkType)[Object.keys(LinkType).indexOf(link.linkType)]
      return linkItem;
    });
  }

  private setGameId() {
    this.route.params.subscribe((route) => {
      this.gameId = route['id'];
    })
  }
}
