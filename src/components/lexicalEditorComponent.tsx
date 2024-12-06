"use client";
import { EditorState } from "lexical";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import ToolbarPlugin from "@/components/plugins/ToolbarPlugin";

const theme = {
  // Add theme styling here if required
};

function onError(error: unknown) {
  console.error("Lexical Editor Error:", error);
}

interface EditorProps {
  onSerializedStateChange: (serializedState: string) => void;
  initialContent: string;
}


function LexEditor({ onSerializedStateChange, initialContent }: EditorProps) {

  let initialConfig

  if (initialContent!="none") {
    initialConfig = {
      namespace: "MyEditor",
      theme,
      onError,
      editorState: initialContent,
    };
  } else {
    initialConfig = {
      namespace: "MyEditor",
      theme,
      onError,}
  }

  const handleSerialization = (editorState: EditorState) => {
    const editorStateJSON = editorState.toJSON();
    const jsonString = JSON.stringify(editorStateJSON);
    onSerializedStateChange(jsonString);
  };

  return (
    <div>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<span style={{fontSize:".75em", color:"grey", marginBottom:"25px", display:"block"}}>Start composing by entering some rich text!</span>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <OnChangePlugin
          onChange={(editorState) => handleSerialization(editorState)}
        />
      </LexicalComposer>
    </div>
  );
}

export default LexEditor;
