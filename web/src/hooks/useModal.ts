import React from 'react';

export const useModal = (
  state: boolean = false,
): [boolean, () => void, () => void] => {
  const [isOpen, setOpen] = React.useState(state);
  const openModal = React.useCallback(() => setOpen(true), []);
  const closeModal = React.useCallback(() => setOpen(false), []);

  return [isOpen, openModal, closeModal];
};

export default useModal;
