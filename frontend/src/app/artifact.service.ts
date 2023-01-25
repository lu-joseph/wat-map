import { Injectable } from '@angular/core';
import { Artifact } from "./artifact"
import { catchError, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { MessageService } from './message.service'
import { Observable, of } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class ArtifactService {
  artifactsURL = "http://localhost:3600/artifacts"

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  getArtifacts(): Observable<Artifact[]> {
    return this.http.get<Artifact[]>(this.artifactsURL)
      .pipe(
        catchError(this.handleError<Artifact[]>('getArtifacts', []))
      )
  }
  getArtifact(scriptname: string): Observable<Artifact> {
    const url = `${this.artifactsURL}/${scriptname}`
    var this_result = this.http.get<Artifact>(url)
    return this_result
      .pipe(
        catchError(this.handleError<Artifact>(`getArtifact scriptname=${scriptname}`))
      )
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`)

      return of(result as T)
    }
  }
  private log(message: string) {
    this.messageService.add(`ArtifactsService: ${message}`)
  }
}
