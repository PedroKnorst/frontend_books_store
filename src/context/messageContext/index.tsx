import { Dispatch, SetStateAction, createContext, useState, useEffect } from 'react';
import * as Toast from '@radix-ui/react-toast';
import './styles.css';
import { CheckCircledIcon, Cross1Icon, CrossCircledIcon } from '@radix-ui/react-icons';

interface IRadixToast {
  title: string;
  message?: string;
  severity: 'success' | 'fail';
  open: boolean;
  onClose: () => void;
}

const RadixToast = (props: IRadixToast) => {
  const { message, severity, open, title, onClose } = props;

  return (
    <Toast.Provider swipeDirection="up">
      <Toast.Root className={`ToastRoot relative bg-white`} open={open}>
        <div
          className={`${
            severity === 'fail' ? 'bg-red-300' : 'bg-green-300'
          } flex justify-start gap-4 rounded bg-opacity-20 px-2 py-3`}
        >
          <Toast.Action className="ToastAction" asChild altText="Severity Icon">
            {severity === 'fail' ? (
              <CrossCircledIcon className="animate-pulse" />
            ) : (
              <CheckCircledIcon className="animate-pulse" />
            )}
          </Toast.Action>
          <div>
            <Toast.Title className={`${severity === 'fail' ? 'text-red-600' : 'text-green-600'} font-bold`}>
              {title}
            </Toast.Title>
            <Toast.Description asChild>
              <p className={`text-sm ${severity === 'fail' ? 'text-red-600' : 'text-green-600'}`}>{message}</p>
            </Toast.Description>
          </div>
          <button onClick={onClose} className="absolute right-1 top-1">
            <Cross1Icon />
          </button>
        </div>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

interface MessageModal {
  title: string;
  content: string;
  severity: 'success' | 'fail';
}

interface MessageContextInterface {
  message: MessageModal;
  setMessage: Dispatch<SetStateAction<MessageModal>>;
}

interface Props {
  children: JSX.Element;
}

export const MessageContext = createContext<MessageContextInterface>({
  message: {
    content: '',
    title: '',
    severity: 'success',
  },
  setMessage: () => {},
});

const MessageStorage = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageModal>({
    content: '',
    title: '',
    severity: 'success',
  });
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(undefined);

  const onClose = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(undefined);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (message.content !== '') {
      setOpen(true);
      const newTimeoutId = setTimeout(() => {
        setOpen(false);
        setTimeoutId(undefined);
        setMessage({ content: '', title: '', severity: 'fail' });
      }, 3000);
      setTimeoutId(newTimeoutId);
    }
  }, [message]);

  return (
    <MessageContext.Provider value={{ setMessage, message }}>
      {message.content !== '' ? (
        <RadixToast
          message={message.content}
          title={message.title}
          open={open}
          severity={message.severity}
          onClose={onClose}
        />
      ) : (
        <></>
      )}
      {props.children}
    </MessageContext.Provider>
  );
};

export { MessageStorage };
