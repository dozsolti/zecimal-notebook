import { useNotebook } from "../../hooks/useNotebook";
import CodeEditorCard from "../CodeEditorCard/CodeEditorCard";
import { useState } from "react";

export default function CustomFunctions() {
  const {
    notebook,
    customFunctionNames,
    onCustomFunctionsChanged,
    addCustomFunction,
  } = useNotebook();

  const [helperFunctionIndex, setHelperFunctionIndex] = useState<number>(0);

  const [showOutput, setShowOutput] = useState(true);

  const onAddFunctionPressed = () => {
    addCustomFunction();
    setHelperFunctionIndex(customFunctionNames.length);
  };

  return (
    <div>
      <p className="w-max text-3xl font-thin mb-3 text-white p-3 border-1 bg-yellow-600">
        Custom functions
      </p>

      <ul className="flex flex-wrap text-sm font-medium text-center border-b border-gray-200">
        {customFunctionNames.map((funcName, i) => (
          <li className="me-2" key={`li-helper-func-${i}`}>
            <span
              onClick={() => setHelperFunctionIndex(i)}
              className={
                helperFunctionIndex == i
                  ? "inline-block p-4 rounded-t-lg text-black bg-yellow-400 cursor-pointer"
                  : "inline-block p-4 rounded-t-lg bg-yellow-700 text-white hover:bg-yellow-700 cursor-pointer"
              }
            >
              {funcName}
            </span>
          </li>
        ))}
        <li className="me-2">
          <span
            onClick={onAddFunctionPressed}
            className="inline-block p-4 rounded-t-lg bg-yellow-700 text-white hover:bg-yellow-700 cursor-pointer"
          >
            +
          </span>
        </li>

        <li className="me-2 ml-auto">
          <span
            onClick={() => setShowOutput((old) => !old)}
            className={
              "inline-block p-4 rounded-t-lg hover:text-white hover:bg-yellow-700 cursor-pointer"
            }
          >
            {showOutput ? "(hide tests)" : "(show tests)"}
          </span>
        </li>
      </ul>
      <div>
        {notebook.custom_functions.map((funcCode, index) => (
          <div
            key={`helper-func-${index}`}
            className={`${index == helperFunctionIndex ? "visible" : "hidden"}`}
          >
            <CodeEditorCard
              key={index}
              codeIndex={index}
              functionType="custom_functions"
              runType="on-change"
              value={funcCode.code}
              onChange={(code) => onCustomFunctionsChanged(index, code)}
              codeHeight={"120px"}
              showOutput={showOutput}
              placeholder={`globalThis.add = (a,b)=>{\nreturn a+b;\n };`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
