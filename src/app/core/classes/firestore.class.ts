import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export abstract class FirestoreClass<T> {
  protected collection: AngularFirestoreCollection<T>;

  constructor(protected db: AngularFirestore) {
  }

  protected setCollection(path: string, queryFn?: QueryFn): void {
    this.collection = path ? this.db.collection(path, queryFn) : null;
  }

  getAll(): Observable<T[]> {
    return this.collection.valueChanges();
  }

}
