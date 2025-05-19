import { useEffect } from "react";
import Editor, { type EditorProps } from "@monaco-editor/react";
import CodeEditorTest from "./components/CodeEditorTests";

import "./CodeEditorCard.css";
import type { FunctionType } from "../../hooks/useNotebook";
import { runCode } from "../../utils/code";

function CodeEditorCard({
  codeHeight = "200px",
  showOutput = true,
  value = "",
  onChange,
  placeholder,
  language = "javascript",
  saveKey,
  isGrowing = false,
  hasMinimap = true,
  codeIndex,
  functionType,
  runType = "on-trigger",
}: {
  saveKey?: string;
  value?: string;
  onChange: (code: string) => void;
  codeIndex: number;
  functionType: FunctionType;

  placeholder?: string;
  runType?: "on-change" | "on-trigger";
  codeHeight?: EditorProps["height"];
  language?: EditorProps["defaultLanguage"];
  showOutput?: boolean;
  isGrowing?: boolean;
  hasMinimap?: boolean;
}) {
  useEffect(() => {
    try {
      if (saveKey) {
        localStorage.setItem(saveKey, value);
      }
      if (runType == "on-change") runCode(value);
    } catch (e) {}
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
      <div className="flex flex-col gap-3 md:flex-row">
        <div className={`${showOutput ? "md:w-2/3": "w-full"}`}>
          <Editor
            width={"100%"}
            height={!isGrowing ? codeHeight : value.split("\n").length * 23}
            language={language}
            value={value}
            onChange={(value) => onChange(value || "")}
            theme="vs-dark"
            options={{
              placeholder: placeholder,
              wordWrap: "on",
              scrollBeyondLastLine: false,
              minimap: { enabled: hasMinimap },
            }}
          />
        </div>
        {!showOutput ? null : (
          <CodeEditorTest functionType={functionType} codeIndex={codeIndex} />
        )}
      </div>
    </div>
  );
}
export default CodeEditorCard;
