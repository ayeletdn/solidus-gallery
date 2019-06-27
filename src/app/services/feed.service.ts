import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  getAsset(filename:string) {
    if  (!filename) {
      throw new Error(`Invalid filename ${filename}`);
    }
    const path = 'assets/' + filename;
    return this.http.get(path);
  }

  /**
   * In-place sort of a FeedArray
   * TODO: create the feed as a 
   * @param feed A feed to sort
   * @param by key to sort by. Default is title
   * @param order sort order. default ASC. any other value will be considered DSC (TODO)
   */
  // sort(feed:FeedArray, by:string="title", order:string="ASC"):FeedArray {
  //   return feed.sort((a,b) => {
  //     if (a[by] < b[by]) return order === "ASC" ?-1:1;
  //     if (a[by] > b[by]) return order === "ASC" ?1:-1;
  //     return 0;
  //   });
  // }
}
