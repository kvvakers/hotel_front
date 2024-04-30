import {Injectable} from "@angular/core";
import {ApiService} from "../api.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../models/user";
import {Observable} from "rxjs";
import {IRespondedUser} from "../../../models/responded-user-interface";

@Injectable({
  providedIn: 'root'
})
export class AccountService extends ApiService{
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
  registration(user: User): Observable<IRespondedUser> {
    this.endpoint = "users/registration/";

    return this.httpClient.post<IRespondedUser>(this.url + this.endpoint, user,{ headers: this.headers })
  }
  authorization(user: User): Observable<IRespondedUser> {
    this.endpoint = "users/authorization/";
    return this.httpClient.post<IRespondedUser>(this.url + this.endpoint, user, { headers: this.headers })
  }
}


