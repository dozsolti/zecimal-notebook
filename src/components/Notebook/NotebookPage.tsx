import CustomFunctions from "../CustomHelperFunctions/CustomFunctions";
import CustomSteps from "../CustomSteps/CustomSteps";
import CustomVariables from "../CustomVariables/CustomVariables";

export type NotebookFunction = {
  code: string;
  tests: string[];
  test_outputs: object[];
};
export type Notebook = {
  custom_variable: string;
  custom_functions: NotebookFunction[];
  steps: NotebookFunction[];
};

function NotebookPage() {

  return (
    <>
      <br />
      <CustomVariables />
      <br />
      <CustomFunctions />
      <br />
      <br />
      <br />
      <br />
      <CustomSteps /> 
    </>
  );
}

export default NotebookPage;
