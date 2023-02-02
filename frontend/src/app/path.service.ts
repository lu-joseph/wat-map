import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Path } from './path/path';


@Injectable({
  providedIn: 'root'
})
export class PathService {
  pathsURL = "http://localhost:3600/dijkstra";
  constructor(
    private http: HttpClient) { }

  getPath(from: string, to: string): Observable<Path> {
    console.log("in path service");
    const url = `${this.pathsURL}/${from}-${to}`;
    var this_result = this.http.get<Path>(url);
    console.log("about to return from path service");
    return this_result
    // .pipe(
    //   catchError(this.handleError<Path>(`getPath from=${from} to=${to}`))
    // )
  }
}
