import type { IFileContext, IOptions } from './types';
export default function getClassNameAndSlug(displayName: string, idx: number, options: IOptions, context: IFileContext): {
    className: string;
    slug: string;
};
