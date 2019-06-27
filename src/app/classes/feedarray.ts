
export type FeedItem = {
    title: string,
    url: string,
    date: Date,
    failed?: boolean
  };
export class FeedArray  {
  feed: Array<FeedItem> = [];

  constructor(feed:Array<FeedItem>) {
    this.feed = feed;
  }

  /**
   * Mark an item as failed to load
   * @param i the index at the feed to be marked as failed
   */
  fail(i:number):string {
    const item = this.feed[i];
    const failedUrl = item.url;
    item.url = 'https://www.shareicon.net/data/128x128/2016/07/21/799500_people_512x512.png';
    item.title = item.title + "(LOAD FAILED)";
    item.failed = true;
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
}