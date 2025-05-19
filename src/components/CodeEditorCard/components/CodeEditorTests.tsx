import { Editor } from "@monaco-editor/react";
import JsonView from "@uiw/react-json-view";
import { useState } from "react";
import { useNotebook, type FunctionType } from "../../../hooks/useNotebook";

function CodeEditorTest({
  codeIndex,
  functionType,
}: {
  codeIndex: number;
  functionType: FunctionType;
}) {
  const { notebook, runFunctionTest, addNewTest, onTestChanged } =
    useNotebook();
  const [testIndex, setTestIndex] = useState(0);

  const currentTest =
    notebook[functionType][codeIndex].tests?.[testIndex] ?? "";
  const currentTestOutput =
    notebook[functionType][codeIndex].test_outputs?.[testIndex] ?? {};

  const addTest = () => {
    setTestIndex(notebook[functionType][codeIndex].tests.length);
    addNewTest(functionType, codeIndex);
  };
  const runTest = () => {
    runFunctionTest(functionType, codeIndex, testIndex);
  };

  return (
    <div className="bg-yellow-100 p-2 flex-1">
      <>
        <p>Custom calls</p>

        <ul className="flex flex-wrap text-sm font-medium text-center text-white mb-3">
          {notebook[functionType][codeIndex].tests?.map((_, i) => (
            <li className="me-2" key={`code-editor-card-li-${i}`}>
              <span
                onClick={() => setTestIndex(i)}
                className={`inline-block px-4 py-3 rounded-lg ${
                  i == testIndex
                    ? `text-white bg-blue-600 `
                    : "text-black hover:text-gray-900 hover:bg-blue-100 cursor-pointer"
                }`}
              > 
                Test {i}
              </span>
            </li>
          ))}
          <li className="me-2">
            <span
              onClick={addTest}
              className="inline-block px-4 py-3 text-white rounded-lg bg-blue-400 hover:text-gray-900 hover:bg-blue-600 cursor-pointer"
            >
              +
            </span>
          </li>
        </ul>

        <Editor
          height="50px"
          defaultLanguage="javascript"
          theme="vs-dark"
          options={{
            placeholder: "return a;",
            lineNumbers: "off",
            minimap: { enabled: false },
            scrollbar: { vertical: "hidden" },
            padding: { top: 6 },
          }}
          value={currentTest}
          onChange={(value) =>
            onTestChanged(functionType, codeIndex, testIndex, value || "")
          }
        />
        <div className="mt-2 text-end">
          <button className="bg-green-600 hover:bg-green-900" onClick={runTest}>
            Run
          </button>
        </div>
        <p>Output</p>
        <JsonView
          displayDataTypes={false}
          style={customTheme as any}
          value={currentTestOutput}
        />
      </>
    </div>
  );
}

export default CodeEditorTest;

const customTheme = {
  "--w-rjv-font-family": "monospace",
  "--w-rjv-color": "#9cdcfe",
  "--w-rjv-key-number": "#268bd2",
  "--w-rjv-key-string": "#9cdcfe",
  "--w-rjv-background-color": "#1e1e1e",
  "--w-rjv-line-color": "#36334280",
  "--w-rjv-arrow-color": "#838383",
  "--w-rjv-edit-color": "var(--w-rjv-color)",
  "--w-rjv-info-color": "#9c9c9c7a",
  "--w-rjv-update-color": "#9cdcfe",
  "--w-rjv-copied-color": "#9cdcfe",
  "--w-rjv-copied-success-color": "#28a745",

  "--w-rjv-curlybraces-color": "#d4d4d4",
  "--w-rjv-colon-color": "#d4d4d4",
  "--w-rjv-brackets-color": "#d4d4d4",
  "--w-rjv-ellipsis-color": "#cb4b16",
  "--w-rjv-quotes-color": "var(--w-rjv-key-string)",
  "--w-rjv-quotes-string-color": "var(--w-rjv-type-string-color)",

  "--w-rjv-type-string-color": "#ce9178",
  "--w-rjv-type-int-color": "#b5cea8",
  "--w-rjv-type-float-color": "#b5cea8",
  "--w-rjv-type-bigint-color": "#b5cea8",
  "--w-rjv-type-boolean-color": "#569cd6",
  "--w-rjv-type-date-color": "#b5cea8",
  "--w-rjv-type-url-color": "#3b89cf",
  "--w-rjv-type-null-color": "#569cd6",
  "--w-rjv-type-nan-color": "#859900",
  "--w-rjv-type-undefined-color": "#569cd6",
};
