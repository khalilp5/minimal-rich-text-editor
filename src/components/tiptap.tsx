"use client";

import { cn } from "@/lib/utils";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { Toggle } from "./ui/toggle";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Strikethrough } from "lucide-react";
import { Separator } from "./ui/separator";

type Props = {
  className?: string;
  value?: object;
  onChange: (content: object) => void;
};

const Tiptap = ({ className, value, onChange }: Props) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: cn(
          "min-h-32 w-full rounded-md rounded-br-none rounded-bl-none border border-input bg-transparent px-3 py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
          className
        ),
      },
    },
    content: value,
    onBlur({ editor }) {
      onChange(editor.getJSON());
    },
  });

  if (!editor) return null;

  return (
    <div>
      <EditorContent editor={editor} />
      <Toolbar editor={editor} />
    </div>
  );
};

export default Tiptap;

const Toolbar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="flex flex-row items-center gap-1 rounded-bl-md rounded-br-md border border-input bg-transparent p-1">
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="h-8 w-[1px]" />
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}>
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() =>
          editor.chain().focus().toggleOrderedList().run()
        }>
        <ListOrdered className="h-4 w-4" />
      </Toggle>
    </div>
  );
};
