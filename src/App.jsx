import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("assa");

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRKSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "@-*&%#~+/.";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  //useRef hook
  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); //to select the copied password
    passwordRef.current?.setSelectionRange(0, 51); //To set a limit on the select range
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passGenerator();
  }, [length, numAllowed, charAllowed, passGenerator]);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#212121]">
      <div className=" bg-slate-300 min-w-max w-6/12 p-3 flex flex-col gap-5 text-3xl rounded-md ">
        <h1 className="w-full font-bold flex justify-center p-4 text-red-500 bg-white text-3xl">
          Password Generator
        </h1>
        <div className="flex justify-center w-full ">
          <input
            type="text"
            value={password}
            placeholder="Your Password"
            className="h-14  p-3 rounded-l-lg"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-500 w-36 rounded-r-lg hover:bg-slate-400"
          >
            Copy
          </button>
        </div>
        <div className="flex justify-center items-center gap-4 w-full">
          <label htmlFor="">Length : {length} </label>
          <input
            type="range"
            min={6}
            max="50"
            value={length}
            className="cursor-pointer w-28"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <input
            type="checkbox"
            checked={numAllowed}
            id="numInput"
            className="h-6 w-6"
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label>Numbers</label>
          <input
            type="checkbox"
            checked={charAllowed}
            id="charInput"
            className="h-6 w-6"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
