import { useRef } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/plugins/babel';
import parserEstree from 'prettier/plugins/estree';
import './code-editor.css';



interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined) => {
    const updatedValue = value ?? '';
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
    <div className='editor-wrapper'>
      <button
        className='button button-format is-warning is-small'
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        value={initialValue}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        defaultLanguage='javascript'
        height="100%"
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
        }}
      />
    </div>
  );

};

export default CodeEditor;