import React from 'react';

function Notifier(props) {
  return (
    <div>
      <Alert variant={props.variant}>
        {props.message}
      </Alert>
    </div>
  );
}

export default Notifier;
