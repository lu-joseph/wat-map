/* To illustrate the operation of the data server's routes, the
   the application defines a couple of components that correspond
   to the two displayed routes.  This component defines the
   procedures for handling data from the ‘/artifacts/NAME’ route.
*/
import { Component, OnInit } from '@angular/core'
import { Artifact } from '../artifact'
import { ArtifactService } from '../artifact.service'

@Component({
  selector: 'app-artifact-list',
  templateUrl: './artifact-list.component.html',
  styleUrls: ['./artifact-list.component.css']
})
export class ArtifactListComponent implements OnInit {

  artifact: Artifact = { cdn: "", scriptname: "", version: "" }
  artifacts: Artifact[] = []
  details = ""

  constructor(private artifactService: ArtifactService) { }
  ngOnInit() {
    console.log("ngoninit running")
    this.getArtifact("sortable.min.js")
    this.getArtifacts()
  }
  detail(artifact: Artifact): void {
    console.log("getting detail for " + artifact)
    this.artifact = artifact
    this.details = "Details regarding " + artifact.scriptname +
      ": Version " + artifact.version + "; cdn: " +
      artifact.cdn + "."
  }
  getArtifacts(): void {
    this.artifactService.getArtifacts()
      .subscribe(artifacts => this.artifacts = artifacts)
  }
  public getArtifact(scriptname: string): void {
    console.log("getting scriptname " + scriptname)
    this.artifactService.getArtifact(scriptname)
      .subscribe(artifact => this.detail(artifact))
  }
}
