import webpack4Loader from '@linaria/webpack4-loader';
import webpack5Loader from '@linaria/webpack5-loader';
declare type W4This = ThisParameterType<typeof webpack4Loader>;
declare type W4Params = Parameters<typeof webpack4Loader>;
declare type W5This = ThisParameterType<typeof webpack5Loader>;
declare type W5Params = Parameters<typeof webpack5Loader>;
declare function webpackLoader(this: W4This, ...args: W4Params): void;
declare function webpackLoader(this: W5This, ...args: W5Params): void;
export default webpackLoader;
