import ReactDOM from 'react-dom';
import { useEffect, useState, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';


const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    startService();
  }, []);


  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    });
  };


  const onChangeEvent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };


  const onClick = async () => {
    if (!ref.current) return;
    console.log(ref.current);

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      },

    })
    console.log(result)
    setCode(result.outputFiles[0].text);
  };


  return <div>
    <textarea value={input} onChange={onChangeEvent}>
    </textarea>
    <div>
      <button onClick={onClick}>Submit</button>
    </div>
    <pre>{code}</pre>
  </div>;

};

ReactDOM.render(<App />, document.querySelector('#root'));


