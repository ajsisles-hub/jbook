import { useEffect, useRef } from 'react';
import './preview.css';
interface PreviewProps {
  code: string;
  err: string;

};

const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (err) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
        };
        // Catch async unhandled errors (e.g., setTimeout, Promise rejections)
        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error);
        });
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            handleError(err);
          }
        }, false);
      </script>
    </body>
  </html>
`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    // Reset iframe HTML document on every update
    iframe.current.srcdoc = html;

    // Only post valid code down to the iframe when there are no bundle errors
    if (!err) {
      const timer = setTimeout(() => {
        iframe.current.contentWindow.postMessage(code, '*');
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [code, err]); // Watch BOTH code and err

  return (
    <div className='preview-wrapper'>
      <iframe
        title='preview'
        ref={iframe}
        sandbox='allow-scripts'
        srcDoc={html}
      />
      {/* Display esbuild compilation/syntax errors in an overlay */}
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;