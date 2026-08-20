import MonacoEditor, { OnMount } from '@monaco-editor/react';


interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const handleEditorDidMount: OnMount = (editor) => {
    console.log('Initial value:', editor.getValue());

  };

  const handleEditorChange = (value: string | undefined) => {
    const updatedValue = value ?? '';
    console.log('Current value:', updatedValue);
    onChange(updatedValue);
  };




  return (<MonacoEditor
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
    }}
  />)
};

export default CodeEditor;