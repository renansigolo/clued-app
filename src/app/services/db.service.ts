import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private afs: AngularFirestore) {}

  // COLLECTIONS //
  collectionValues$(path: string): Observable<any> {
    return this.afs.collection(path).valueChanges()
  }

  docValues$(path): Observable<any> {
    return this.afs.doc(path).valueChanges()
  }

  // ACTIONS //

  /**
   * @param path 'collection' or 'collection/docID'
   * @param data new data
   *
   * Creates or updates data on a collection or document.
   */
  updateAt(path: string, data: object): Promise<any> {
    const segments = path.split('/').filter((v) => v)
    if (segments.length % 2) {
      // Odd is always a collection
      return this.afs.collection(path).add(data)
    } else {
      // Even is always document
      return this.afs.doc(path).set(data, { merge: true })
    }
  }

  /**
   * @param path path to document
   *
   * Deletes document from Firestore
   */
  delete(path) {
    return this.afs.doc(path).delete()
  }
}
