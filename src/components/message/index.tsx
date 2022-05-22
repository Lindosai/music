import React, { memo, useState } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import Snackbar from '@mui/material/Snackbar';
import { MessageWrapper } from './style';

const Message = memo((props: any) => {
  const { message, duration, type } = props;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return ReactDOM.createPortal((
    <MessageWrapper>
      <Snackbar
        open={true}
        message={message}
        autoHideDuration={duration}
        onClose={e => handleClose()}
      />
    </MessageWrapper>
  ), document.getElementById('root'));
});

const message: any = {
  dom: null,
  container: null,
  mount(message: string, duration: number, type: string) {
    this.dom = document.createElement('div');
    document.body.appendChild(this.dom);
    this.container = createRoot(this.dom);
    const JSXdom = (<Message message={message} duration={duration} type={type} />);
    this.container.render(JSXdom);
  },
  unmount() {
    if (this.dom) {
      this.container.unmount();
      document.body.removeChild(this.dom);
    }
  },
  success({ message, duration }: any) {
    this.unmount();
    this.mount(message, duration, 'success');
  },
  error({ message, duration }: any) {
    this.unmount();
    this.mount(message, duration, 'error');
  },
  warning({ message, duration }: any) {
    this.unmount();
    this.mount(message, duration, 'warning');
  },
  info({ message, duration }: any) {
    this.unmount();
    this.mount(message, duration, 'info');
  },
};

export default message;
