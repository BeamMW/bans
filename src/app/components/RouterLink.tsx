import React, {
    FunctionComponent,
    RefAttributes,
    PropsWithoutRef,
    ForwardRefExoticComponent
} from "react";

import {
    Link,
    LinkProps as RouterLinkProps
} from "react-router-dom";

import { Link as ThemeUILink, LinkProps as ThemedUILinkProps } from "theme-ui";

type ForwardRef<T, P> = ForwardRefExoticComponent<
    PropsWithoutRef<P> & RefAttributes<T>
>;

type CombinedProps = ThemedUILinkProps & RouterLinkProps;

const CustomLink: ForwardRef<HTMLAnchorElement, CombinedProps> = ThemeUILink;

export const RouterLink: FunctionComponent<CombinedProps> = ({ children, ...props }) => {
    return (
        <CustomLink as={Link} {...props}>
            {children}
        </CustomLink>
    );
};
