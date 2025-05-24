import { useNotebook } from "../hooks/useNotebook";

function Header() {
  const { clear } = useNotebook();
  const askClear = () => {
    if (confirm("Do you wanna delete everything")) clear();
  };
  return (
    <div className="border-y-1 mt-5 p-3">
      <button className="hover:bg-red-500 hover:text-white bg-gray-200 text-gray-800" onClick={askClear}>Clear</button>
    </div>
  );
}
export default Header;
