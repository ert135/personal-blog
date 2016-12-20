import { Router, RouterModule} from '@angular/router'

import { AdminComponent } from './admin.component';

export const AdminRoutes = RouterModule.forChild([
  { path: 'admin', component: AdminComponent}
])
