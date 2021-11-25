import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Alert from "react-bootstrap/Alert";
import { DismissNotification } from "../actions";

function Notification(props) {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  return (
    <div>
      {Object.keys(notification).length !== 0 && (
        <Alert
          variant={notification.type}
          onClose={() => dispatch(DismissNotification())}
          dismissible
        >
          <p>{notification.message}</p>
        </Alert>
      )}
    </div>
  );
}

export default Notification;
