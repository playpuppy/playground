import React, { useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import './Editor.css';

import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { CodeEditor, ContentChangedEvent } from '../../logic/editor';

type EditorFooterProps = {
  fontPlus: () => void;
  fontMinus: () => void;
};

const EditorFooter: React.FC<EditorFooterProps> = (
  props: EditorFooterProps
) => {
  return (
    <div id="editor-footer">
      <Button className="puppy-background" onClick={props.fontPlus}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
      <Button className="puppy-background" onClick={props.fontMinus}>
        <FontAwesomeIcon icon={faMinus} />
      </Button>
    </div>
  );
};

export type EditorProps = {
  fontSize: number;
  theme: string;
  source: string;
  onChange: (source: string, event: ContentChangedEvent) => void;
  editorDidMount: (editor: CodeEditor) => void;
  fontPlus: () => void;
  fontMinus: () => void;
};

const Editor: React.FC<EditorProps> = (props: EditorProps) => {
  const [height, setHeight] = useState(500);
  const [width, setWidth] = useState(500);
  const [resizeTimer, setResizeTimer] = useState(null as NodeJS.Timeout | null);
  const editorOptions = {
    selectOnLineNumbers: true,
    fontSize: props.fontSize,
    wordWrap: 'on' as 'on',
    lightbulb: { enabled: true },
  };

  useEffect(() => {
    addEventListener('resize', () => {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
        return;
      }
      setResizeTimer(
        setTimeout(() => {
          setHeight(document.getElementById('right-col')!.clientHeight);
          setWidth(document.getElementById('right-col')!.clientWidth);
        }, 300)
      );
    });
    setHeight(document.getElementById('right-col')!.clientHeight);
    setWidth(document.getElementById('right-col')!.clientWidth);
  }, [resizeTimer]);

  return (
    <div id="puppy-editor">
      <MonacoEditor
        width={width}
        height={height}
        language={'python'}
        theme={props.theme}
        value={props.source}
        options={editorOptions}
        onChange={props.onChange}
        editorDidMount={props.editorDidMount}
      />
      <EditorFooter fontPlus={props.fontPlus} fontMinus={props.fontMinus} />
    </div>
  );
};

export default Editor;
