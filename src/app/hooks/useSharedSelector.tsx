import { useEffect, useReducer } from "react";
import { selectSharedAppParams } from '@app/store/SharedStore/selectors';
import { useSelector } from 'react-redux';

export const useSharedSelector = (select) => {
  const sharedStoreParams = useSelector(selectSharedAppParams());
  
  return select(sharedStoreParams);
};
