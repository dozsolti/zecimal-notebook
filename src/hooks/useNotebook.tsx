import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";
import type { Notebook } from "../components/Notebook/NotebookPage";
import { runCode } from "../utils/code";

// 1. Define the Context Value Type
export type FunctionType = Exclude<keyof Notebook, "custom_variable">;
interface NotebookContextValue {
  notebook: Notebook;
  updateNotebook: (notebook: Notebook) => void;

  onCustomVariableChanged: (newValue: string) => void;

  customFunctionNames: string[];
  onCustomFunctionsChanged: (i: number, newValue: string) => void;
  addCustomFunction: () => void;

  addStep: () => void;
  onStepChanged: (i: number, newValue: string) => void;

  // Add types for other state or functions here
  addNewTest: (functionType: FunctionType, functionIndex: number) => void;
  onTestChanged: (
    functionType: FunctionType,
    functionIndex: number,
    testIndex: number,
    testCode: string
  ) => void;
  runFunctionTest: (
    functionType: FunctionType,
    functionIndex: number,
    testIndex: number
  ) => void;
}

// 1. Create the Context
const NotebookContext = createContext<NotebookContextValue>(null as any); // Or an initial state object

const TEST_EMPTY: Notebook = {
  custom_variable: ``,
  custom_functions: [{ code: "", tests: [""], test_outputs: [] }],
  steps: [{ code: "", tests: [""], test_outputs: [] }],
};

// 2. Create the Provider Component
export const NotebookProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notebook, setNootbook] = useState<Notebook>(
    (JSON.parse(
      localStorage.getItem("auto-saved-notebook") || "null"
    ) as Notebook) || TEST_EMPTY
  );
  //#region Variables
  const onCustomVariableChanged = (code: string) => {
    setNootbook((prev) => {
      prev.custom_variable = code;
      return { ...prev };
    });
  };
  //#endregion

  //#region functions
  const customFunctionNames = useMemo(() => {
    return notebook.custom_functions.map(
      (func, i) =>
        func.code
          .substring(
            0,
            func.code.indexOf("=") == -1
              ? func.code.length
              : func.code.indexOf("=")
          )
          .replace("globalThis", "")
          .replace(".", "") || `Func${i}`
    );
  }, [notebook]);

  const onCustomFunctionsChanged = (i: number, code: string) => {
    setNootbook((prev) => {
      prev.custom_functions[i].code = code;
      return { ...prev };
    });
  };

  const addCustomFunction = () => {
    setNootbook((prev) => {
      prev.custom_functions.push({
        code: "",
        tests: [""],
        test_outputs: [],
      });
      return { ...prev };
    });
  };
  //#endregion

  //#region Steps
  const addStep = () => {
    setNootbook((prev) => {
      prev.steps.push({
        code: "",
        tests: ["return "],
        test_outputs: [{}],
      });
      return { ...prev };
    });
  };
  const onStepChanged = (i: number, code: string) => {
    setNootbook((prev) => {
      prev.steps[i].code = code;
      return { ...prev };
    });
  };
  //#endregion

  //#region tests

  const addNewTest: NotebookContextValue["addNewTest"] = (
    functionType,
    functionIndex
  ) => {
    setNootbook((prev) => {
      prev[functionType][functionIndex].tests.push("return ");
      prev[functionType][functionIndex].test_outputs.push({});
      return { ...prev };
    });
  };
  const runFunctionTest: NotebookContextValue["runFunctionTest"] = (
    functionType,
    functionIndex,
    testIndex
  ) => {
    try {
      let currentTest = notebook[functionType][functionIndex].tests[testIndex];

      let codeStr = notebook[functionType][functionIndex].code + ";\n";

      // if (runType == "on-trigger") codeStr += value + ";\n";
      codeStr += `(()=>{${currentTest};})()`;

      const result = runCode(codeStr);
      // console.log(result);
      setNootbook((prev) => {
        prev[functionType][functionIndex].test_outputs[testIndex] = {
          result,
        };
        return { ...prev };
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onTestChanged: NotebookContextValue["onTestChanged"] = (
    functionType,
    functionIndex,
    testIndex,
    testCode
  ) => {
    setNootbook((prev) => {
      prev[functionType][functionIndex].tests[testIndex] = testCode;
      return { ...prev };
    });
  };
  //#endregion

  useEffect(() => {
    localStorage.setItem("auto-saved-notebook", JSON.stringify(notebook));
  }, [notebook]);
  const contextValue: NotebookContextValue = {
    notebook,
    updateNotebook: setNootbook,
    onCustomVariableChanged,

    customFunctionNames,
    onCustomFunctionsChanged,
    addCustomFunction,

    addStep,
    onStepChanged,

    addNewTest,
    onTestChanged,
    runFunctionTest,
  };

  return (
    <NotebookContext.Provider value={contextValue}>
      {children}
    </NotebookContext.Provider>
  );
};

// 3. Create the Custom Hook
export const useNotebook = () => {
  const context = useContext(NotebookContext);
  if (!context) {
    throw new Error("useNotebook must be used within a NotebookProvider");
  }
  return context;
};
