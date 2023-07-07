import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, actions } from '@shared/store';
import { ModalProps } from '@shared/interfaces';

export const useModal = () =>
// Get modal params from store using reselect
  ({
    modal: useSelector(selectors.getModal()),
  });
export const useShowModal = () => {
  const dispatch = useDispatch();
  return useCallback(
    (params: ModalProps = {}) => {
      dispatch(actions.showModal(params));
    },
    [dispatch],
  );
};

export const useLeaveModalData = (leaveText?: string) => ({
  body: leaveText || (
  <span>
    You have unsaved changes.
    {' '}
    <br />
    Are you sure you want to leave now?
  </span>
  ),
  title: 'Leave',
  confirmText: 'Leave',
});

export const useHideModal = () => {
  const dispatch = useDispatch();
  const handleOnClose = useCallback(() => {
    dispatch(actions.hideModal());
  }, [dispatch]);
  return {
    handleOnClose,
  };
};
