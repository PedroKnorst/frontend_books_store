import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { ReactElement } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';

interface InputProps {
  children: ReactElement;
  triggerButton: ReactElement;
  confirmButton?: ReactElement;
  open?: boolean;
}

const Modal = ({ children, triggerButton, confirmButton, open }: InputProps) => {
  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Trigger>{triggerButton}</AlertDialog.Trigger>
      <AlertDialog.Content className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center">
        <AlertDialog.Cancel className="fixed cursor-default bottom-0 left-0 right-0 top-0 bg-gray-700 opacity-50" />
        <div className="z-[9999] max-h-[400px] overflow-y-scroll grid max-w-xl gap-4 text-black rounded-lg bg-white p-6">
          <AlertDialog.Cancel className="justify-self-end">
            <Cross1Icon height={24} width={24} />
          </AlertDialog.Cancel>
          {children}
          {confirmButton && (
            <div className="justify-self-center">
              <AlertDialog.Action className="m-2">{confirmButton}</AlertDialog.Action>
            </div>
          )}
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default Modal;
