
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

  fail(i:number):FeedItem {
    const item = this.feed[i];
    item.url = 'https://www.shareicon.net/data/128x128/2016/07/21/799500_people_512x512.png';
    item.title = item.title + "(LOAD FAILED)";
    item.failed = true;
    return item;
  }

  map(fn:Function) {
    const output = [];
    for (let i = 0; i < this.feed.length; i++) {
      output.push(fn(this.feed[i], i, this.feed));
    }
    return output;
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