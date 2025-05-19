import { useEffect } from "react";
import Editor from "@monaco-editor/react";
import "./CodeEditorCard.css";
import { runCode } from "../../utils/code";

function CustomEditorCardVariables({
  value = "",
  onChange,
  placeholder,
  saveKey,
}: {
  value: string;
  onChange: (code: string) => void;
  saveKey?: string;
  placeholder?: string;
}) {
  useEffect(() => {
    if (saveKey) {
      localStorage.setItem(saveKey, value);
    }
    try {
      runCode(value + ";");
    } catch (error: any) {
      // console.error(error);
    }
  }, [value]);
  useEffect(() => {
    if (saveKey) {
      const savedCode = localStorage.getItem(saveKey);
      if (savedCode) {
        onChange(savedCode);
      }
    }
  }, [saveKey]);

  return (
    <div className="code-editor-card">
      <Editor
        height={value.split("\n").length * 23}
        language={"javascript"}
        value={value}
        onChange={(value) => onChange(value || "")}
        theme="vs-dark"
        options={{
          placeholder: placeholder,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          minimap: { enabled: false },
        }}
      />
    </div>
  );
}
export default CustomEditorCardVariables;
