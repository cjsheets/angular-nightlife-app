import { CollectionObject } from './collection-object.model';

export interface Attendance extends CollectionObject {
  id: string;
  guests: [{
    id: string
  }];
}
