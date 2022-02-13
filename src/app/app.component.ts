import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { ReposService } from './services/repos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'listing';
  userName: string = "";
  repoData: any[] = []
  userDetails: any[] = []
  noOfPages: number = 0
  pages: number[]=[]
  currentNumber: number=1
  loading$ = this.loader.loading$
  constructor(private repoService: ReposService,private loader:LoadingService) { }

  prevNext(counter:boolean){
    if (counter){
        this.currentNumber = this.currentNumber + 1
        this.fillRepoData(this.currentNumber)
        if (this.currentNumber > this.pages.length){
          this.pages.push(this.currentNumber)
        }
    }else{
      if (this.currentNumber>0 && this.currentNumber<this.pages.length){
        this.currentNumber = this.currentNumber - 1
        this.fillRepoData(this.currentNumber)
      }
    }
  }

  fillRepoData(index:number,fromSubmitForm:boolean=false){
    if (index<this.noOfPages || fromSubmitForm){
      this.repoService.getRepos(this.userName,index).subscribe((data) => {
        this.repoData = []
        Object.entries(data).forEach(
          ([key, value]) => {
            let formatData = { fullName: String, language: Array(), description: String, repoLink: value.clone_url };
            formatData.fullName = value.name
            formatData.description = value.description
            formatData.repoLink = value.git_url
            this.repoService.getLanguages(value.languages_url).subscribe((language) => {
              Object.entries(language).forEach(
                ([key, value],index) => {
                  if (index<4)
                  formatData.language.push(key)})
              this.repoData.push(formatData)
            })
          }
        );
      })
    }
  }

  pagination(index:number){
    this.fillRepoData(index)
    this.currentNumber = index
  }
  submitForm() {
    this.repoService.getUser(this.userName).subscribe((user) => {
      this.userDetails = []
      Object.entries(user).forEach(([key, value]) => key == 'public_repos' ? this.noOfPages = value/10 : null)
      let i = 1
      if (this.noOfPages >5) {
        this.pages = [1,2,3,4,5]
      } else {
      while (i < this.noOfPages){
        this.pages.push(i)
        i++
      }
    }
      this.userDetails.push(user)
    })
    
    this.fillRepoData(1,true)
  }
}
