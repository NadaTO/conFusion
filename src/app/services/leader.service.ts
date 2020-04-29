import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS} from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]>{
    return Promise.resolve(LEADERS);
  }

  getDish(id: string): Promise<Leader> {
  return Promise.resolve(LEADERS.filter((l) => (l.id === id))[0]);
}

  getFeaturedLeader(): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((l) => l.featured)[0]);
  }
}
