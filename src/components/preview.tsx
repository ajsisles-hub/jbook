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
          console.error(err);
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
    // Reset iframe content on every bundle update
    iframe.current.srcdoc = html;

    const timer = setTimeout(() => {
      if (err) {
        // If there's a build/syntax error, 
        // send code that immediately invokes handleError inside iframe
        iframe.current.contentWindow.postMessage(
          `handleError(${JSON.stringify(err)});`,
          '*'
        );
      } else {
        // Otherwise, run the bundled user code
        iframe.current.contentWindow.postMessage(code, '*');
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [code, err]); // Watch both code and err updates!

  return (
    <div className='preview-wrapper'>
      <iframe
        title='preview'
        ref={iframe}
        sandbox='allow-scripts'
        srcDoc={html}
      />
      {/* Display esbuild compilation/syntax errors in an overlay
      {err && <div className="preview-error">{err}</div>} */}
    </div>
  );
};



export default Preview;