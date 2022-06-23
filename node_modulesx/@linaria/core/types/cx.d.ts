export declare type LinariaClassName = string & {
    __linariaClassName: true;
};
export declare type ClassName<T = string> = T | false | void | null | 0 | '';
interface ICX {
    (...classNames: ClassName<LinariaClassName>[]): LinariaClassName;
    (...classNames: ClassName[]): string;
}
/**
 * Takes a list of class names and filters for truthy ones, joining them into a single class name for convenience.
 * eg.
 * ```js
 *  cx('red', isBig && 'big') // returns 'red big' if `isBig` is true, otherwise returns 'red'
 * ```
 * If space separated atomic styles are provided, they are deduplicated according to the first hashed valued:
 *
 * ```js
 *  cx('atm_a_class1 atm_b_class2', 'atm_a_class3') // returns `atm_a_class3 atm_b_class2`
 * ```
 *
 * @returns the combined, space separated class names that can be applied directly to the class attribute
 */
declare const cx: ICX;
export default cx;
