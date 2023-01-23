import {Component, OnInit} from '@angular/core';
import {AppFacade} from './store/app.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'app-upload-xml';


  constructor(private readonly appFacade: AppFacade) {
  }

  ngOnInit(): void {
    this.appFacade.startup();
  }
}
