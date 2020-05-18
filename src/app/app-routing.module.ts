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
    path: 'form-qp',
    loadChildren: () =>
      import('./lazy-modules/form-qp/form-qp.module').then(
        (m) => m.LazyFormQpModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
