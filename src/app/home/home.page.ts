import { Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { PopoverController, IonSlides } from '@ionic/angular'
import { Observable } from 'rxjs'
import { User } from '../model/user'
import { ProfileComponent } from '../profile/profile.component'
import { AuthService } from '../services/auth.service'
import { VimeoService } from '../services/vimeo.service'
import { DbService } from '../services/db.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('sliderEl') protected sliderRef: IonSlides

  user: User
  vimeoPlayer: any
  videoThumbnail: any = ''
  videos: any
  groups = [
    {
      id: 633121,
      title: 'featured',
    },
    {
      id: 633110,
      title: 'action',
    },
    {
      id: 633108,
      title: 'kids',
    },
    {
      id: 633107,
      title: 'comedy',
    },
    {
      id: 633115,
      title: 'documentary',
    },
    {
      id: 633117,
      title: 'islamic',
    },
    {
      id: 633119,
      title: 'news',
    },
    {
      id: 633120,
      title: 'talk-show',
    },
  ]

  featuredFreeVideos$: Observable<any[]>
  featuredPremiumVideos$: Observable<any[]>
  actionVideos$: Observable<any[]>
  comedyVideos$: Observable<any[]>
  kidsVideos$: Observable<any[]>
  documentaryVideos$: Observable<any[]>
  islamicVideos$: Observable<any[]>
  newsVideos$: Observable<any[]>
  talkShowVideos$: Observable<any[]>

  slideOpts = {
    slidesPerView: 2.2,
    centeredSlides: false,
    loop: true,
  }

  slideOptsFeatured = {
    slidesPerView: 1.2,
    centeredSlides: true,
  }

  constructor(
    public auth: AuthService,
    public popoverController: PopoverController,
    public vimeo: VimeoService,
    private db: DbService,
    private router: Router
  ) {}

  ngOnInit() {
    this.featuredFreeVideos$ = this.vimeo.getGroupVideos(633121)
    this.featuredPremiumVideos$ = this.vimeo.getGroupVideos(656531)
    this.actionVideos$ = this.vimeo.getGroupVideos(633110)
    this.kidsVideos$ = this.vimeo.getGroupVideos(633108)
    this.comedyVideos$ = this.vimeo.getGroupVideos(633107)
    this.documentaryVideos$ = this.vimeo.getGroupVideos(633115)
    this.islamicVideos$ = this.vimeo.getGroupVideos(633117)
    this.newsVideos$ = this.vimeo.getGroupVideos(633119)
    this.talkShowVideos$ = this.vimeo.getGroupVideos(633120)
  }

  openVideo(videoUri: string) {
    const videoId = +videoUri.split('/').pop()
    this.vimeo.playVideo(videoId)
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: ProfileComponent,
      cssClass: 'popover-class',
      translucent: true,
    })

    popover.present()
  }

  closePopover() {
    this.popoverController.dismiss()
  }

  ionViewWillLeave() {
    this.closePopover()
  }
}
