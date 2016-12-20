import { Router, RouterModule} from '@angular/router'

import { MainPage } from '../main-page';
import { AppComponent }   from '../app.component';
import { MainHeader } from '../main-header';
import { MainPostService } from '../stores/posts/mainPost.service';
import { LoginModal } from '../login.component';
import { PostDetailComponent } from '../post-detail.component';
import { loginModalWrapper } from '../modalDirective';
import { LoginService } from '../stores/login/login.service';
import { SignedInUserService } from '../stores/signedInUser/signedInUser.service';
import { UserDetailComponent } from '../user-detail.component';

export const routing = RouterModule.forRoot([
  { path: '', component: MainPage, pathMatch: 'full' },
  { path: 'post/:id', component: PostDetailComponent },
  { path: '**', component: MainPage },
])
