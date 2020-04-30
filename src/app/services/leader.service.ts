import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS} from '../shared/leaders';
import { observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]>{
    return  of(LEADERS).pipe(delay(2000));
  }

  getDish(id: string): Observable<Leader> {
    return  of(LEADERS.filter((l) => (l.id === id))[0]).pipe(delay(2000));
}

  getFeaturedLeader(): Observable<Leader> {
    return  of(LEADERS.filter((l) => l.featured)[0]).pipe(delay(2000));
  }
}
