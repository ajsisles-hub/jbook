import { ResizableBox } from 'react-resizable';
import './resizable.css';
import { resizableProps } from 'react-resizable/build/propTypes';
type ResizableBoxProps = React.ComponentProps<typeof ResizableBox>;

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactElement; // Explicitly define children here
}


const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {

  let resizableProps: ResizableBoxProps;

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width: window.innerWidth * 0.75,
      resizeHandles: ['e'],
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity]
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      minConstraints: [Infinity, 96],
      maxConstraints: [Infinity, window.innerHeight * 0.9]
    }
  };

  return (
    <ResizableBox {...resizableProps}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;