import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Login } from '../request/login';
import { User } from '../models/user';
import { Respuesta } from '../request/respuesta';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    let usuario = {
      correo: username,
      contrasena: password,
    };

    return this.http.post<Login>(environment.URL + '/usuario/session', usuario, httpOptions);
  }

  register(user: User): Observable<any> {
    return this.http.post<Respuesta>(environment.URL + '/usuario/register', user, httpOptions);
  }
  
}
