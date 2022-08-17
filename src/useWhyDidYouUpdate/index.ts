import { useEffect, useRef } from "react";

export type IProps = Record<string, any>;

export default function useWhyDidYouUpdate(
  componentName: string,
  props: IProps
) {
  /* 用ref把每次的props缓存 */
  const prevProps = useRef<IProps>({});

  /* useEffect第二个参数没传，那么将在组件每次更新时都会执行 */
  useEffect(() => {
    if (prevProps.current) {
      /*  */
      const allKeys = Object.keys({ ...prevProps.current, ...props });
      const changedProps: IProps = {};

      allKeys.forEach((key) => {
        /* 使用Object.is判等，把不等的值收集起来，注意这是浅比较 */
        if (!Object.is(prevProps.current[key], props[key])) {
          changedProps[key] = {
            from: prevProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length) {
        console.log("[why-did-you-update]", componentName, changedProps);
      }
    }
    /* 比较完更新ref中的props到最新 */
    prevProps.current = props;
  });
}
