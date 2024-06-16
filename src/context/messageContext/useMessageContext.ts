import { useContext } from "react";
import { MessageContext } from ".";

function useMessageContext() {
  const context = useContext(MessageContext);
  const { setMessage } = context;
  return { setMessage };
}

export { useMessageContext };
