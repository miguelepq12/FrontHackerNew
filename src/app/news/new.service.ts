import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {New} from './new';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Injectable()
export class NewService {
  constructor(private http: HttpClient) { }

  private urlEndPoint = 'http://localhost:8080/api/news';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  getNews(): Observable<New[]> {
    return this.http.get<any>(this.urlEndPoint).pipe(
      map(response => {
        const news = response.feed as New[];
        return news.map(n => {
          n.create_at = moment(n.create_at).fromNow();
          return n;
        });
      })
    );
  }

  delete(id: string): Observable<New> {
    return this.http.delete<New>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
