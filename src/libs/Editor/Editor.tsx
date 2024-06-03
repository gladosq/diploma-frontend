// @ts-nocheck

import ExampleTheme from './themes/ExampleTheme';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import ToolbarPlugin from './plugins/ToolbarPlugin.jsx';
import {HeadingNode, QuoteNode} from '@lexical/rich-text';
import {TableCellNode, TableNode, TableRowNode} from '@lexical/table';
import {ListItemNode, ListNode} from '@lexical/list';
import {CodeHighlightNode, CodeNode} from '@lexical/code';
import {AutoLinkNode, LinkNode} from '@lexical/link';
import {LinkPlugin} from '@lexical/react/LexicalLinkPlugin';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {MarkdownShortcutPlugin} from '@lexical/react/LexicalMarkdownShortcutPlugin';
import {TRANSFORMERS} from '@lexical/markdown';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import {useEffect, useRef, useState} from 'react';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {ExportPlugin} from './plugins/ExportPlugin.tsx';
import './lexical-styles.css';
import {EditorConfig} from 'lexical';

function Placeholder() {
  return <p className='editor-placeholder'>Введите содержимое статьи..</p>;
}

const editorConfig = {
  theme: ExampleTheme,
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode
  ],
  namespace: 'editor'
};

type EditorProps = {
  onChangeEditor?: (data: []) => void;
  editorConfig: EditorConfig;
}

const EMPTY_CONTENT = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

function MyOnChangePlugin({onChange, initialData}): null {
  if (!initialData) return null;
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({editorState}) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

function InitialDataPlugin({initialData}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return () => {

      const editorState = editor.parseEditorState(initialData ? initialData : EMPTY_CONTENT);
      editor.setEditorState(editorState);
    }

  }, [editor]);
  return null;
}

export default function Editor({onChangeEditor, initialData}: EditorProps) {
  const exportPluginRef = useRef();
  const [, setEditorState] = useState();

  const onChangeHandler = (editorState, editor) => {
    const editorStateJSON = editorState.toJSON();
    setEditorState(editorStateJSON);
    onChangeEditor && onChangeEditor(editorStateJSON);
  };

  if (!initialData) return null;

  return (
    <>
      <LexicalComposer initialConfig={editorConfig}>
        <div className='editor-container'>
          <ToolbarPlugin/>
          <div className='editor-inner'>
            <div className='editor-plain-text'></div>
            <RichTextPlugin
              contentEditable={<ContentEditable id={'editor'} className='editor-input'/>}
              placeholder={<Placeholder/>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin/>
            {/*<AutoFocusPlugin/>*/}
            <CodeHighlightPlugin/>
            <ListPlugin/>
            <LinkPlugin/>
            <AutoLinkPlugin/>
            <ListMaxIndentLevelPlugin maxDepth={7}/>
            <MarkdownShortcutPlugin transformers={TRANSFORMERS}/>
            <MyOnChangePlugin onChange={onChangeHandler} initialData={initialData}/>
            <InitialDataPlugin initialData={initialData}/>
            <ExportPlugin ref={exportPluginRef}/>
          </div>
        </div>
      </LexicalComposer>
    </>
  );
}
