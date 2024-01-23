import { Injectable } from '@angular/core';
import { UserMetadata } from './models/user-metadata.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private userStorageKey: string = 'user';

  createUser(user: UserMetadata) {
    this.saveToStorage(user, this.userStorageKey);
  }

  deleteUser() {
    this.remove(this.userStorageKey);
  }

  getUser(): UserMetadata | null {
    const storageData = localStorage.getItem(this.userStorageKey);
    if (storageData == null) return null;
    const userMetadata = JSON.parse(storageData!) as UserMetadata;
    return userMetadata;
  }

  private saveToStorage<T>(obj: T, key: string): void {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(obj));
  }

  private remove(key: string): void {
    localStorage.removeItem(key);
  }
}
