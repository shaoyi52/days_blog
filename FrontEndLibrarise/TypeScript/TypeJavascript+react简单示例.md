# 简单编译

**参考资料**
[Ts 学习指南](https://juejin.im/post/6872111128135073806#heading-110)

## 内嵌式申明

```
import { useEffect, useRef } from 'react';

function useInterval(
  fn: () => void,
  delay: number | null | undefined,
  options?: {
    immediate?: boolean;
  },
): void {
  const immediate = options?.immediate;

  const fnRef = useRef<() => void>();
  fnRef.current = fn;

  useEffect(() => {
    if (delay === undefined || delay === null) return;
    if (immediate) {
      fnRef.current?.();
    }
    const timer = setInterval(() => {
      fnRef.current?.();
    }, delay);
    return () => {
      clearInterval(timer);
    };
  }, [delay]);
}

export default useInterval;
```

type 式申明

```
type ProFormSwitchProps = ProFormItemProps<SwitchProps> & {
  checkedChildren?: SwitchProps['checkedChildren'];
  unCheckedChildren?: SwitchProps['unCheckedChildren'];
};

/**
 * 单选 Switch
 * @param
 */
const ProFormSwitch: React.FC<ProFormSwitchProps> = React.forwardRef(
  ({ fieldProps, unCheckedChildren, checkedChildren, proFieldProps }, ref: any) => {
    return (
      <ProField
        valueType="switch"
        mode="edit"
        fieldProps={{
          ...fieldProps,
          unCheckedChildren,
          checkedChildren,
        }}
        text={fieldProps?.checked}
        ref={ref}
        {...proFieldProps}
      />
    );
  },
);
```
