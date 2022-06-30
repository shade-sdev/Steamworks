import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { LinkType } from 'src/app/core/model/enum-front';
import { LinkBack } from 'src/app/core/model/model-back';
import { Link } from 'src/app/core/model/model-front';
import { LinkService } from 'src/app/core/services/link.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-create-link',
  templateUrl: './create-link.component.html',
  styleUrls: ['./create-link.component.css']
})
export class CreateLinkComponent implements OnInit {

  private create: boolean = true;
  public formTitle: string | undefined;
  public gameId?: typeof uuid;
  public linkId?: typeof uuid;
  public linkForm: FormGroup;
  public linkTypes: string[] = Object.keys(LinkType);

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private toast: HotToastService, private linkService: LinkService) {
    this.linkForm = this.formBuilder.group({
      linkType: ['ONLINE_FIX'],
      link: []
    })
  }

  ngOnInit(): void {
    this.checkForCreateOrUpdate();
    this.setLabels();
  }

  private setLabels() {
    this.formTitle = this.create ? 'Create Link' : 'Update Link';
  }

  private checkForCreateOrUpdate() {
    this.route.params.subscribe((route) => {
      this.gameId = route['gameid']
      if (route['id'] == null) {
        this.create = true;
      } else {
        this.linkId = route['id'];
        this.create = false;
        this.linkService.getLinkById(this.linkId!).subscribe((link: Link) => {
          this.linkForm.patchValue({
            linkType: link.linkType,
            link: link.link
          })
        })
      }
    });
  }

  private getLinkObject(): LinkBack {
    let link = {} as LinkBack;
    link.gameId = this.gameId!;
    link.linkType = this.linkForm.controls['linkType'].value;
    link.link = this.linkForm.controls['link'].value;
    return link;
  }

  public getEnumValue(key: string): string {
    if ((<any>Object).keys(LinkType).includes(key)) {
      return Object.values(LinkType)[Object.keys(LinkType).indexOf(key)];
    }
    return '';
  }

  public viewLinks() {
    this.router.navigate([`/admin/view-link/${this.gameId}`])
  }

  public submitForm() {
    if (this.create) {
      this.linkService.createLink(this.getLinkObject()).pipe(
        this.toast.observe(
          {
            loading: 'Saving...',
            success: 'Saved',
            error: 'Saving failed',

          })
      )
        .subscribe();

    } else {
      this.linkService.updateLink(this.linkId!, this.getLinkObject()).pipe(
        this.toast.observe(
          {
            loading: 'Saving...',
            success: 'Saved',
            error: 'Saving failed',

          })
      )
        .subscribe();

    }
  }

}
