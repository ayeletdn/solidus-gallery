
export type FeedItem = {
    title: string,
    url: string,
    date: Date,
    failed?: boolean
  };
export class FeedArray  {
  private feed: Array<FeedItem> = [];

  constructor(feed:Array<FeedItem>) {
    // trying to use https to see if works on mobile
    this.feed = feed.map((item:FeedItem) => {
      return Object.assign(item, {url: FeedArray.setHttps(item.url)});
    });
  }

  get list():Array<FeedItem> {
    return this.feed;
  }

  /**
   * Mark an item as failed to load
   * @param i the index at the feed to be marked as failed
   * @returns the offending url
   */
  fail(i:number):string {
    const item = this.feed[i];
    const failedUrl = item.url;
    // remove the bad item
    this.feed.splice(i, 1);
    return failedUrl;
  }

  map(fn:(value:FeedItem, index:number, array:Array<FeedItem>) => Array<FeedItem>) {
    return this.feed.map(fn);
  }

  /**
   * A copy of the feed, sorted as requested
   * @param feed A feed to sort
   * @param by key to sort by. Default is title
   * @param order sort order. default ASC. any other value will be considered DSC (TODO)
   */
  sort(by:string="title", order:string="ASC"):Array<FeedItem> {
    return this.feed.slice().sort((a,b) => {
      if (a[by] < b[by]) return order === "ASC" ?-1:1;
      if (a[by] > b[by]) return order === "ASC" ?1:-1;
      return 0;
    });
  }

  filter(title:string):Array<FeedItem> {
    return this.feed.filter(item => {return item.title.toLowerCase().indexOf(title.toLowerCase()) > -1});
  }

  private static setHttps(url:string):string {
    return url.replace('http://', 'https://');
  }

}