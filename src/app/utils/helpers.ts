import _ from 'lodash';

export const omitDeep = (collection, excludedOptins) => _.map(collection, _.partial(_.omit, _, excludedOptins))
 