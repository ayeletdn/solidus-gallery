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
}

export type FeedItem = {
  title: string,
  url: string,
  date: string,
  failed?: boolean
};
export type FeedArray = Array<FeedItem>;
