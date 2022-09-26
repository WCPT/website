import React from 'react';
import { Dialog, Transition } from '@headlessui/react';

type IProps = {
  url: string;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const VideoModal: React.FC<IProps> = ({
  url,
  isOpen,
  openModal,
  closeModal,
}) => {
  // const [modalWidth, setModalWidth] = React.useState('100%');

  const keydownHandler = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal],
  );

  React.useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, [keydownHandler]);

  if (!isOpen) {
    return null;
  }

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <Transition.Child
              as={React.Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='flex flex-1 max-w-6xl overflow-hidden shadow-xl'>
                <iframe
                  className='w-full aspect-video shadow-lg z-50'
                  src={url}
                  title='YouTube video player'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  tabIndex={-1}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default VideoModal;
