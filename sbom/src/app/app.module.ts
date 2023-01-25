/* app.module.ts specifies the modules this Angular
   application requires.  It retrieves results from
   the dataserver, for example; therefore it must
   import HttpClient. */
import { AppComponent } from './app.component'
import { ArtifactListComponent } from './artifact-list/artifact-list.component'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClient } from '@angular/common/http'
import { HttpClientModule } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { NgModule } from '@angular/core'
import { Observable } from 'rxjs'
import { RouterModule } from '@angular/router'
import { TopComponent } from './top/top.component'

@NgModule({
  declarations: [
    AppComponent,
    ArtifactListComponent,
    TopComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'artifact-list', component: ArtifactListComponent },
      { path: '', component: TopComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent, TopComponent]
})
export class AppModule { }
