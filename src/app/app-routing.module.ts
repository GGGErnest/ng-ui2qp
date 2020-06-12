import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'lzy-load',
    loadChildren: () =>
      import('./lazy-modules/lzy-load-content/lzy-load-content.module').then(
        (m) => m.LazyLzyLoadContentModule
      ),
  },
  {
    path: 'ng-ui2qp',
    loadChildren: () =>
      import('./lazy-modules/ng-ui2qp/lazy-ui2qp.module').then(
        (m) => m.LazyUi2QpModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
