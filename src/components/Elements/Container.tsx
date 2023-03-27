import {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react';
import cx from 'clsx';

type ContainerType = ForwardRefExoticComponent<
  HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>
>;

const OuterContainer: ContainerType = forwardRef(function OuterContainer(
  { className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx('sm:px-8', className)} {...props}>
      <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
    </div>
  );
});

const InnerContainer: ContainerType = forwardRef(function InnerContainer(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('relative px-4 sm:px-8 lg:px-12', className)}
      {...props}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  );
});

export const Container: ContainerType & {
  Outer?: ContainerType;
  Inner?: ContainerType;
} = forwardRef(function Container(
  { children, ...props }: React.HTMLAttributes<HTMLDivElement>,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <OuterContainer ref={ref} {...props}>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  );
});

Container.Outer = OuterContainer;
Container.Inner = InnerContainer;
