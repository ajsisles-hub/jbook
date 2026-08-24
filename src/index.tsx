import { createRoot } from 'react-dom/client';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeCell from './components/code-cell';

const App = () => {


  // Suppress benign ResizeObserver error overlay in dev
  window.addEventListener('error', (e) => {
    if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
      const resizeObserverErrDiv = document.getElementById('webpack-dev-server-client-overlay-div');
      const resizeObserverErr = document.getElementById('webpack-dev-server-client-overlay');
      if (resizeObserverErrDiv) resizeObserverErrDiv.style.display = 'none';
      if (resizeObserverErr) resizeObserverErr.style.display = 'none';
      e.stopImmediatePropagation();
    }
  });

  return (
    <div>
      <CodeCell />
      {/* <CodeCell /> */}
    </div>);
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
