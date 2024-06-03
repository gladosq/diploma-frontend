import { $generateHtmlFromNodes } from "@lexical/html";
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

const HtmlGeneratorPlugin = () => {
  const [editor] = useLexicalComposerContext();

  editor.registerUpdateListener(() =>
    editor.update(() => console.log($generateHtmlFromNodes(editor, null)))
  );

  return null;
};

export default HtmlGeneratorPlugin;
