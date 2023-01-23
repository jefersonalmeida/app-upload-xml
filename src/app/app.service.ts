import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FileInterface} from './interface/xml.interface';
import {delay, Observable, of} from 'rxjs';
import {environment} from '../environments/environment';

const API_URL = environment.endpoint;

@Injectable({providedIn: 'root'})
export class AppService {
  constructor(private readonly http: HttpClient) {
  }

  upload(model: FileInterface): Observable<null> {
    console.log(model);
    return of(null).pipe(
      delay(5),
    );
    // return this.http.post<void>(`${API_URL}/upload`, {...model});
  }
}
