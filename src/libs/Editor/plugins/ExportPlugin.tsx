import {forwardRef, useImperativeHandle} from 'react';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';

export interface ExportPluginHandle {
  getHtmlAsync: () => Promise<string>;
}

interface ExportPluginProps {
}

export const ExportPlugin = forwardRef<ExportPluginHandle, ExportPluginProps>((_props, ref): JSX.Element | null => {
  const [editor] = useLexicalComposerContext();

  useImperativeHandle(ref, () => ({
    getHtmlAsync: getHtmlAsync,
  }));

  function getHtmlAsync(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        editor.getEditorState().read(() => {
          const raw = $generateHtmlFromNodes(editor, null);
          resolve(raw);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  return null;
});
