import { Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

interface IConfirmableDirective {
  injector: Injector;
  ngOnInit?: Function;
}

export const Confirmable = () => {
  return function confirmable(
    target: IConfirmableDirective,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // 缓存方法引入
    const originalMethod = descriptor.value;

    let dialogService: MatDialog;

    target.ngOnInit = function (this: IConfirmableDirective) {
      dialogService = this.injector.get(MatDialog);
    };

    return descriptor;
  };
};
