import { Component, OnInit } from '@angular/core';
import { PathService } from '../path.service';
import { Graph } from '../../../../backend/src/app/Graph';

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.css']
})
export class PathComponent implements OnInit {
  buildings: string[] = [];
  routePath: string[] = [];
  from: any = "";
  to: any = "";
  constructor(private pathService: PathService) { }
  ngOnInit(): void {
    this.buildings = Graph.buildings;
  }
  getPath() {
    console.log("start");
    this.pathService.getPath(this.from, this.to)
      .subscribe(buildings =>
        buildings.path.forEach(element => {
          this.routePath.push(element);
        }));
    // this.routePath = buildings.path);
  }
  selectFrom(e: Event) {
    const element = e.currentTarget as HTMLSelectElement;
    this.from = element.value;
  }
  selectTo(e: Event) {
    const element = e.currentTarget as HTMLSelectElement;
    this.to = element.value;
  }
}
