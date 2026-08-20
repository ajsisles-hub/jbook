import MonacoEditor from '@monaco-editor/react';


interface CodeEditorProps {
  initialValue: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
  return (<MonacoEditor
    value={initialValue}
    height="500px"
    width="500px"
    theme="vs-dark"
    defaultLanguage='javascript'
    options={{
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