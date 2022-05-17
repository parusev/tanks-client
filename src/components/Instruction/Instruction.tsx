import { FC, memo } from 'react';

const Instruction: FC = function () {
  return (
    <aside className="instruction">
      Use <kbd>W</kbd> (<kbd>&uarr;</kbd>), <kbd>A</kbd> (<kbd>&darr;</kbd>),{' '}
      <kbd>S</kbd> (<kbd>&larr;</kbd>), <kbd>D</kbd> (<kbd>&rarr;</kbd>) to move
      tank and <kbd>Ctrl</kbd> to shoot
    </aside>
  );
};

export default memo(Instruction);
