import {Injectable} from "@angular/core";
import {ApiService} from "../api.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
  getUserData(): Observable<IRespondedUser> {
    this.endpoint = "users/me/";

    this.headers = this.headers = this.getHeaders();

    return this.httpClient.get<IRespondedUser>(this.url + this.endpoint, { headers: this.headers })
  }
}


