import { FC, memo } from 'react';
import './NoConnection.scss';

const NoConnection: FC = function () {
  return (
    <section className="no-connection">
      Not connected.
      <br />
      <button onClick={() => window.location.reload()}>Reconnect</button>
    </section>
  );
};

export default memo(NoConnection);
