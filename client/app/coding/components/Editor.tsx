"use client";
import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-twilight";
import { axiosFetchAuth } from "@/lib/axiosConfig";

const Editor = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [textInputArea, setTextInputArea] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [outputColor, setOutputColor] = useState("text-white"); 
  const [expectedOutputColor, setExpectedOutputColor] = useState("text-white"); 

  useEffect(() => {
    if (output === expectedOutput) {
      setOutputColor("text-green-500"); 
      setExpectedOutputColor("text-green-500");
    } else {
      setOutputColor("text-red-500"); 
      setExpectedOutputColor("text-red-500");
    }
  }, [output, expectedOutput]);

  const handleChange = (newValue: any) => {
    setCode(newValue);
  };

  const handleSubmit = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      axiosFetchAuth(token)
        .post(
          "/compile",
          {
            lang: "cpp",
            code: code,
            input: textInputArea,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then((data) => {
          setLoading(false);
          setOutput(data.data.res);
        })
        .catch((err) => {
          setOutput(JSON.stringify({ err: err }));
          setLoading(false);
        });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <button
        className="p-2 bg-green-300 text-white rounded-md shadow-md"
        type="button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Loading..." : "Run Code"}
      </button>
      <AceEditor
        mode="c_cpp"
        theme="twilight"
        onChange={handleChange}
        value={code}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        width="100%"
        height="400px"
        className="mt-4"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="w-full md:w-1/3">
          <label className="text-white">
            Input (Keep it empty if no input.)
          </label>
          <textarea
            className="hide-scroll-bar cursor-text text-white w-full bg-gray-950 h-[10rem]  overflow-scroll border border-gray-600 rounded-md p-2"
            onChange={(e) => setTextInputArea(e.target.value)}
            style={{ whiteSpace: "pre-line" }}
            value={textInputArea}
          />
        </div>
        <div className="w-full md:w-1/3">
          <label className="text-white">Output</label>
          <textarea
            className={`hide-scroll-bar ${outputColor} w-full bg-gray-950 h-[10rem]  overflow-scroll border border-gray-600 rounded-md p-2`}
            style={{ whiteSpace: "pre-line" }}
            value={output}
          />
        </div>
        <div className="w-full md:w-1/3">
          <label className="text-white">Expected Output</label>
          <textarea
            className={`hide-scroll-bar ${expectedOutputColor} w-full bg-gray-950 h-[10rem]  overflow-scroll border border-gray-600 rounded-md p-2`}
            style={{ whiteSpace: "pre-line" }}
            value={expectedOutput}
            onChange={(e) => setExpectedOutput(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
