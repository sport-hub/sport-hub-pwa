import { Component } from '@angular/core';
import { AppState } from '@app/app.state';
import { UserModel } from '@app/user/models';
import { selectAllUsers, UserQueryAction, UserUpdateAction } from '@app/user/store';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: Observable<UserModel[]> = this.userStore.pipe(select(selectAllUsers));

  constructor(private userStore: Store<AppState>) {
    this.userStore.dispatch(new UserQueryAction());
  }

  updateUser(id: string, age: number) {
    this.userStore.dispatch(new UserUpdateAction(id, { age }));
  }
}
