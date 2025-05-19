import { useNotebook } from "../../hooks/useNotebook";
import CustomEditorCardVariables from "../CodeEditorCard/CustomEditorCardVariables";

export default function CustomVariables() {
  const { notebook, onCustomVariableChanged } = useNotebook();

  return (
    <>
      <p className="w-max text-3xl font-thin mb-3 text-white p-3 border-1 bg-yellow-600">
        Custom variables
      </p>
      <CustomEditorCardVariables
        // saveKey="custom_variable"
        placeholder="globalThis.n = 10;"
        value={notebook.custom_variable}
        onChange={onCustomVariableChanged}
      />
    </>
  );
}
