import s from './ModuleArticle.module.scss';
import {useCookies} from 'react-cookie';
import {useParams} from 'react-router-dom';
import {useModule} from '../../api/modules.ts';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ExportPlugin} from '../../libs/Editor/plugins/ExportPlugin.tsx';
import {useEffect, useRef, useState} from 'react';
import ExampleTheme from '../../libs/Editor/themes/ExampleTheme.js';
import {HeadingNode, QuoteNode} from '@lexical/rich-text';
import {TableCellNode, TableNode, TableRowNode} from '@lexical/table';
import {ListItemNode, ListNode} from '@lexical/list';
import {CodeHighlightNode, CodeNode} from '@lexical/code';
import {AutoLinkNode, LinkNode} from '@lexical/link';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import CodeHighlightPlugin from '../../libs/Editor/plugins/CodeHighlightPlugin.jsx';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {LinkPlugin} from '@lexical/react/LexicalLinkPlugin';
import AutoLinkPlugin from '../../libs/Editor/plugins/AutoLinkPlugin.jsx';
import ListMaxIndentLevelPlugin from '../../libs/Editor/plugins/ListMaxIndentLevelPlugin.jsx';
import {MarkdownShortcutPlugin} from '@lexical/react/LexicalMarkdownShortcutPlugin';
import {TRANSFORMERS} from '@lexical/markdown';
import './../../libs/Editor/lexical-styles.css';
import Editor from '../../libs/Editor/Editor.tsx';


function Placeholder() {
  return <p className='editor-placeholder'>Введите содержимое статьи..</p>;
}

const EMPTY_CONTENT = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';


export default function ModuleArticle() {
  const [initialData, setInitialData] = useState();
  const [cookies] = useCookies(['auth-data']);
  const {moduleId} = useParams();
  const exportPluginRef = useRef();

  const {data, isSuccess} = useModule({token: cookies['auth-data'], id: moduleId});

  useEffect(() => {
    if (isSuccess) setInitialData(data?.article);
  }, []);

  const editorConfig = {
    editable: false,
    onError(error) {
      throw error;
    },
    theme: ExampleTheme,
    editorState: Array.isArray(data?.article) ? EMPTY_CONTENT : JSON.stringify(data?.article),
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

  if (!isSuccess) return;

  return (
    <div className={s.wrapper}>
      <h1>Материал</h1>
      <div className={s.article}>
        <div className={s.editorContainer}>
          <LexicalComposer initialConfig={editorConfig}>
            <RichTextPlugin
              contentEditable={<ContentEditable id={'editor'} className='editor-input'/>}
              placeholder={<Placeholder/>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin/>
            <AutoFocusPlugin/>
            <CodeHighlightPlugin/>
            <ListPlugin/>
            <LinkPlugin/>
            <AutoLinkPlugin/>
            <ListMaxIndentLevelPlugin maxDepth={7}/>
            <MarkdownShortcutPlugin transformers={TRANSFORMERS}/>
            <ExportPlugin ref={exportPluginRef} />
          </LexicalComposer>
        </div>
      </div>
    </div>
  );
}
