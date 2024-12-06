"use client";
import { $getRoot, $getSelection, EditorState } from "lexical";
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

type LexicalNode = {
  detail: number;
  format: number;
  mode: string;
  style: string;
  text: string;
  type: string;
  version: number;
};

type ParagraphNode = {
  children: LexicalNode[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
  textFormat: number;
  textStyle: string;
};

type RootNode = {
  children: ParagraphNode[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
};

type LexicalState = {
  root: RootNode;
};



function renderLexicalState(contentObject:LexicalState|undefined) {
  const root = contentObject!.root;

  return root.children.map((paragraph, index) => {
    const paragraphContent = paragraph.children.map((child, i) => {
      let formattedText = <>{child.text}</>;

      if (child.format === 1) {
        formattedText = <strong key={i}>{formattedText}</strong>;
      } else if (child.format === 2) {
        formattedText = <em key={i}>{formattedText}</em>;
      }

      return formattedText;
    });

    return <p key={index}>{paragraphContent}</p>;
  });
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
