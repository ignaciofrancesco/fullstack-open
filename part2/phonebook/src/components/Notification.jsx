const Notification = (props) => {
  const { message, notificationClass } = props;

  if (message === null) {
    return null;
  }

  return <div className={notificationClass}>{message}</div>;
};

export default Notification;
