import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit{
  watchlist: any[] = [];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getWatchlist();
  }
  getWatchlist():void {
    this.http.get<any[]>('http://localhost:8080/watchlist').subscribe(
      response => {
        this.watchlist = response;
      },
      error => {
        console.error('Error retrieving watchlist', error);
      }
    );
  }
  removeFromWatchlist(productId: number): void {
    this.http.delete(`http://localhost:8080/watchlist/${productId}`, { responseType: 'text' }).subscribe(
      response => {
        console.log(response); // Log the response
        console.log('Product removed from watchlist successfully');
        this.getWatchlist(); // Refresh the watchlist after removing the product
      },
      error => {
        console.error('Failed to remove product from watchlist', error);
      }
    );
  }
}