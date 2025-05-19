import { useNotebook } from "../../hooks/useNotebook";
import CodeEditorCard from "../CodeEditorCard/CodeEditorCard";
import { useState } from "react";

export default function CustomSteps() {
  const { notebook, addStep, onStepChanged } = useNotebook();

  const [isStepsCollapsed, setIsStepsCollapsed] = useState<boolean[]>(
    notebook.steps.map((_) => true)
  );
  const addFunction = () => {
    addStep();
    setIsStepsCollapsed((arr) => [...arr, true]);
  };
  return (
    <div>
      <p className="text-center text-4xl font-light mb-3 bg-white p-3 border-1 border-yellow-300">
        Main steps
      </p>
      {notebook.steps.map((step, index) => (
        <div key={`steps-${index}`}>
          <div className="flex mt-6">
            <p className="text-2xl font-thin mb-3 text-white p-3 border-1 bg-yellow-600">
              Step {index + 1}
            </p>
            <span
              onClick={() =>
                setIsStepsCollapsed((old) => {
                  old[index] = !old[index];
                  return [...old];
                })
              }
              className={
                "ml-auto inline-block p-4 rounded-t-lg hover:text-white hover:bg-yellow-700 cursor-pointer"
              }
            >
              {isStepsCollapsed[index] ? "(hide tests)" : "(show tests)"}
            </span>
          </div>
          <div>
            <CodeEditorCard
              key={index}
              codeHeight={"300px"}
              showOutput={isStepsCollapsed[index]}
              value={step.code}
              onChange={(code) => onStepChanged(index, code)}
              codeIndex={index}
              functionType="steps"
              runType="on-trigger"
            />
          </div>
        </div>
      ))}

      <div className="text-center mt-12">
        <hr className="mb-5" />
        <button
          className="p-15 text-2xl bg-yellow-600 hover:bg-yellow-700"
          onClick={addFunction}
        >
          + Step
        </button>
      </div>
    </div>
  );
}
