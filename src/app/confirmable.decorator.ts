import { Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

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

    // 重新所装饰的方法实现
    descriptor.value = async function (...args: any[]) {
      const res = await dialogService
        .open(ConfirmDialogComponent, {
          data: {
            title: '删除测试服务',
          },
        })
        .afterClosed()
        .toPromise();

      // 确认弹窗用户选择结果
      if (res) {
        // 如果用户点击确认
        // 我们将原始参数传入原始方法并执行
        const result = originalMethod.apply(this, args);

        // 并返回执行结果
        return result;
      }
    };

    return descriptor;
  };
};
