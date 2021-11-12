import React from "react";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";

import Editor from "@draft-js-plugins/editor";

import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "@draft-js-plugins/buttons";

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const PostEditor = ({ editor, handleBody }: any) => {
  return (
    <div className="editor">
      <Toolbar>
        {
          // may be use React.Fragment instead of div to improve perfomance after React 16
          (externalProps) => (
            <div>
              <HeadlineOneButton {...externalProps} />
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <CodeButton {...externalProps} />
              <UnorderedListButton {...externalProps} />
              <OrderedListButton {...externalProps} />
              <BlockquoteButton {...externalProps} />
              <CodeBlockButton {...externalProps} />
            </div>
          )
        }
      </Toolbar>
      <Editor
        editorState={editor.editorState}
        onChange={handleBody}
        plugins={[toolbarPlugin]}
      />
    </div>
  );
};

export default PostEditor;
