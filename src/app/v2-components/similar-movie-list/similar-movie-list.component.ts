import { Component, OnInit, Input } from '@angular/core';
import { SimilarMovie } from 'src/storyStructures';

@Component({
  selector: 'similar-movie-list',
  templateUrl: './similar-movie-list.component.html',
  styleUrls: ['./similar-movie-list.component.scss']
})
export class SimilarMovieListComponent implements OnInit {

  @Input() similarMovieList: SimilarMovie[];
  @Input() deleteMovieCallback: (movieId: string) => void;

  constructor() { }

  ngOnInit() {
  }

  showDeleteBtn(): boolean {
    return !!this.deleteMovieCallback;
  }

  delete(movieId: string) {
    this.deleteMovieCallback(movieId);
  }

}
