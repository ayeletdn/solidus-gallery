import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from '../services/feed.service';
import { FeedArray, FeedItem} from '../classes/feedarray';
import { Lightbox, LightboxEvent, LIGHTBOX_EVENT } from 'ngx-lightbox';
import { Subscription } from 'rxjs';


@Component({
  selector: 'my-gallery',
  templateUrl: './my-gallery.component.html',
  styleUrls: ['./my-gallery.component.css']
})
export class MyGalleryComponent implements OnInit {
  @Input() feed:string; // the name of the file in the assets 
  @Input() sorting:boolean = true; // enable sorting
  @Input() search:boolean = true; // enable filter by title
  feedItems: Array<FeedItem>;
  searchBy:string = "";
  sortBy:string;
  sortOrder:string = "ASC";
  private _feed:FeedArray;
  private slideshow = [];
  private slideshowSub:Subscription;

  constructor(
    private feedService:FeedService, 
    private _lightbox: Lightbox,
    private _lightboxEvent: LightboxEvent
  ) { }

  imageFallback(event) {
    const i = event.target.attributes['data-index'].value;
    const url = this._feed.fail(i);
    this.removeFromSlideshow(url);
  }

  openSlideshow(index: number): void {
    // open lightbox
    this._lightbox.open(this.slideshow, index);
    this.slideshowSub = this._lightboxEvent.lightboxEvent$
      .subscribe(event => this.onSlideshowEvent(event));
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  filter(on:string) {
    this.searchBy = on;
    // pre-sort if needed
    const feed = on ? this._feed.filter(on, this.feedItems) : this.feedItems;
    // then filter
    this.feedItems = this.searchBy || this.sortOrder ? this._feed.sort(this.searchBy, this.sortOrder, feed) : feed;
    this.setSlideshow();
  }

  sort(by:string) {
    this.sortBy = by;
    // pre-filter if needed
    const feed = this.searchBy ? this._feed.filter(this.searchBy) : this.feedItems;
    // sort the filtered 
    this.feedItems = by || this.sortOrder ? this._feed.sort(by, this.sortOrder, feed) : feed ;
    this.setSlideshow();
  }

  order(order:string) {
    this.sortOrder = order;
    // pre-filter if needed
    const feed = this.searchBy ? this._feed.filter(this.searchBy) : this.feedItems;
    // sort the filtered 
    this.feedItems = this.sortBy || order ? this._feed.sort(this.sortBy, order, feed) : feed;
    this.setSlideshow();
  }

  ngOnInit() {
    this.feedService.getAsset(this.feed).subscribe((data:Array<FeedItem>) => {
      this._feed = new FeedArray(data);
      this.feedItems = this._feed.list;
      this.setSlideshow();
    });
  }

  private setSlideshow():void {
    this.slideshow = this.feedItems.map(item => {
      return {src: item.url, caption: item.title};
    });
  }

  private removeFromSlideshow(url:string):void {
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
