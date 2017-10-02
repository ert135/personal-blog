import { Router, RouterModule} from '@angular/router'

import { AdminComponent } from './admin.component';

import { AdminPageGuard } from './admin.guard'

export const AdminRoutes = RouterModule.forChild([
  { path: 'admin', component: AdminComponent, canActivate: [AdminPageGuard]}
])
