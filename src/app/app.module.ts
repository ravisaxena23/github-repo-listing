import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReposService } from './services/repos.service';
import { RepoListingComponent } from './repo-listing/repo-listing.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoadingService } from './services/loading.service';
import { NetworkInterceptor } from './interceptors/network.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RepoListingComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ReposService,LoadingService,{ provide: HTTP_INTERCEPTORS,useClass: NetworkInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
