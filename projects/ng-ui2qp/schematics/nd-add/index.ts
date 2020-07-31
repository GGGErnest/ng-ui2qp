import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {NodePackageInstallTask} from '@angular-devkit/schematics/tasks';

// Just return the tree
// tslint:disable-next-line:variable-name
export function ngAdd(_options: any): Rule {
  // tslint:disable-next-line:variable-name
  return (tree: Tree, _context: SchematicContext) => {
    _context.addTask(new NodePackageInstallTask());
    return tree;
  };
}
