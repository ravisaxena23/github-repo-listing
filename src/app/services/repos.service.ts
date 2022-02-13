import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReposService {

  constructor(private http:HttpClient) { }

  getRepos(username:string,page:number){
    var repoApi = 'https://api.github.com/users/' + username + '/repos?per_page=10&page='+page
    console.log(repoApi)
     return this.http.get(repoApi)
  }

  getLanguages(language:string){
    return this.http.get(language)
  }
  getUser(userName:string){
    var user = 'https://api.github.com/users/' + userName
    return  this.http.get(user)
  }
}
