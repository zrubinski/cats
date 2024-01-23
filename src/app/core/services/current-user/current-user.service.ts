import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { UserMetadata } from '../local-storage/models/user-metadata.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  constructor(private localStorageService: LocalStorageService) {}

  login(userId: string, userName: string) {
    this.localStorageService.createUser({ userId, userName } as UserMetadata);
  }

  logout() {
    this.localStorageService.deleteUser();
  }

  get isLogged(): boolean {
    return this.localStorageService.getUser() != null;
  }
}
