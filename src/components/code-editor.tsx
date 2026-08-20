import { useRef } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/plugins/babel';
import parserEstree from 'prettier/plugins/estree';



interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const handleEditorDidMount: OnMount = (editor) => {
    console.log('Initial value:', editor.getValue());
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined) => {
    const updatedValue = value ?? '';
    console.log('Current value:', updatedValue);
    onChange(updatedValue);
  };

  const onFormatClick = async () => {

    // get unformat code from editor
    const unformatted = editorRef.current.getModel().getValue();
    try {
      // format code 
      const formatted = await prettier.format(unformatted, {
        parser: 'babel',
        plugins: [parserBabel, parserEstree],
        useTabs: false,
        semi: true,
        singleQuote: true
      });

      // set format value to editor
      editorRef.current.setValue(formatted);

    } catch (err) {
      console.log('Formatting error: ', err);
    }


  };



  return (
    <div>
      <button className='button is-warning'
        onClick={onFormatClick}
      >Format</button>
      <MonacoEditor
        value={initialValue}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        height="500px"
        width="500px"
        theme="vs-dark"
        defaultLanguage='javascript'
        options={{
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          fontSize: 16,
          lineNumbersMinChars: 3,
          scrollBeyondLastLine: false,
          automaticLayout: true
        }} />
    </div>
  );
};

export default CodeEditor;