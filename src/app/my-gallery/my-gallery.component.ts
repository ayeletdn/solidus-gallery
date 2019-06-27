import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from '../services/feed.service';
import { Lightbox, LightboxEvent, LIGHTBOX_EVENT } from 'ngx-lightbox';
import { Subscription } from 'rxjs';


// should be in elsewhere?
type feedItem = {
  title: string,
  url: string,
  date: string,
  failed?: boolean
};
type feedArray = Array<feedItem>;


@Component({
  selector: 'my-gallery',
  templateUrl: './my-gallery.component.html',
  styleUrls: ['./my-gallery.component.css']
})
export class MyGalleryComponent implements OnInit {
  @Input() assetFile:string; // the name of the file in the assets 
  feed: feedArray;
  private slideshow = [];
  private slideshowSub:Subscription;

  constructor(
    private feedService:FeedService, 
    private _lightbox: Lightbox,
    private _lightboxEvent: LightboxEvent
  ) { }

  imageFallback(event) {
    const i = event.target.attributes['data-index'].value;
    const item = this.feed[i];
    this.removeFromSlideshow(item.url);
    item.url = 'https://www.shareicon.net/data/128x128/2016/07/21/799500_people_512x512.png';
    item.title = "LOAD FAILED: " + item.title;
    item.failed = true;
  }

  openSlideshow(index: number): void {
    // prevent opening slideshow for error images
    // TODO: change mouse indicator in template
    if (this.feed[index].failed) return;
    // open lightbox
    this._lightbox.open(this.slideshow, index);
    this.slideshowSub = this._lightboxEvent.lightboxEvent$
      .subscribe(event => this.onSlideshowEvent(event));
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  ngOnInit() {
    this.feedService.getAsset(this.assetFile).subscribe((data:feedArray) => {
      this.feed = data;
      this.initSlideShow();
    });
  }

  private initSlideShow():void {
    this.slideshow = this.feed.map(item => {
      return {src: item.url, caption: item.title};
    });
  }

  private removeFromSlideshow(url):void {
    this.slideshow = this.slideshow.filter(item => { return url !== item.src });
  }

  private onSlideshowEvent(event: any): void {
    // remember to unsubscribe the event when lightbox is closed
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      // event CLOSED is fired
      this.slideshowSub.unsubscribe();
    }
  
    if (event.id === LIGHTBOX_EVENT.CHANGE_PAGE) {
      // event change page is fired
      console.log(event.data); // -> image index that lightbox is switched to
    }
  }

}
