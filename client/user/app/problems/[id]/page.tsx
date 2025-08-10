"use client";
import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  CheckCircle,
  Clock,
  ThumbsUp,
  MessageSquare,
  BookmarkPlus,
  Code,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Editor, { OnChange } from "@monaco-editor/react";

export default function Page() {
  const [activeLanguage, setActiveLanguage] = useState("javascript");
  const editorRef = useRef(null);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  // Code templates for different languages
  const codeTemplates = {
    javascript: `function twoSum(nums, target) {
  // Write your solution here
  
}`,
    python: `def twoSum(nums, target):
    # Write your solution here
    
    return []`,
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
      // Write your solution here
        
      return new int[]{0, 0};
    }
}`,
    cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        
        return {0, 0};
    }
};`,
  };

  const [codeByLanguage, setCodeByLanguage] = useState({
    javascript: codeTemplates.javascript,
    python: codeTemplates.python,
    java: codeTemplates.java,
    cpp: codeTemplates.cpp,
  } as Record<string, string>);

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setActiveLanguage(language);
  };

  // Handle code change
  const handleCodeChange : OnChange = (value) => {
    setCodeByLanguage({
      ...codeByLanguage,
      [activeLanguage]: value ?? '',
    });
  };

  // Auto-closing brackets functionality
  // const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   const textarea = e.currentTarget;
  //   const { selectionStart, selectionEnd, value } = textarea;

  //   // Handle tab key for indentation
  //   if (e.key === "Tab") {
  //     e.preventDefault();
  //     const newValue =
  //       value.substring(0, selectionStart) +
  //       "  " +
  //       value.substring(selectionEnd);
  //     setCodeByLanguage({
  //       ...codeByLanguage,
  //       [activeLanguage]: newValue,
  //     });

  //     // Set cursor position after indentation
  //     setTimeout(() => {
  //       textarea.selectionStart = textarea.selectionEnd = selectionStart + 2;
  //     }, 0);
  //   }

  //   // Auto-closing brackets
  //   const brackets: Record<string, string> = {
  //     "(": ")",
  //     "{": "}",
  //     "[": "]",
  //     '"': '"',
  //     "'": "'",
  //     "`": "`",
  //   };

  //   if (brackets[e.key]) {
  //     e.preventDefault();
  //     const closingBracket = brackets[e.key];
  //     const newValue =
  //       value.substring(0, selectionStart) +
  //       e.key +
  //       closingBracket +
  //       value.substring(selectionEnd);

  //     setCodeByLanguage({
  //       ...codeByLanguage,
  //       [activeLanguage]: newValue,
  //     });

  //     // Place cursor between brackets
  //     setTimeout(() => {
  //       textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
  //     }, 0);
  //   }
  // };

  // Format code function
const formatCode = () => {
  const code = codeByLanguage[activeLanguage];
  const lines = code.split("\n");
  let indentLevel = 0;
  const formattedLines = [];

  // Helper to determine if a line should increase indent in Python
  const isPython = activeLanguage === "python";
  const pythonIncreaseIndentKeywords = [
    "def",
    "if",
    "for",
    "while",
    "with",
    "elif",
    "else",
    "try",
    "except",
    "finally",
    "class",
  ];

  for (let i = 0; i < lines.length; i++) {
    const trimmedLine = lines[i].trim();

    if (!trimmedLine) {
      formattedLines.push("");
      continue;
    }

    if (!isPython) {
      // JavaScript-style indentation
      if (
        trimmedLine.startsWith("}") ||
        trimmedLine.startsWith(")") ||
        trimmedLine.startsWith("]")
      ) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      const indentation = "  ".repeat(indentLevel);
      formattedLines.push(indentation + trimmedLine);

      if (
        trimmedLine.endsWith("{") ||
        trimmedLine.endsWith("(") ||
        trimmedLine.endsWith("[")
      ) {
        indentLevel++;
      }
    } else {
      // Python-style indentation
      // Decrease indent if line starts with dedent keywords like 'elif', 'else', 'except', 'finally'
      const lower = trimmedLine.toLowerCase();
      if (
        ["elif", "else", "except", "finally"].some((kw) => lower.startsWith(kw))
      ) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      const indentation = "  ".repeat(indentLevel);
      formattedLines.push(indentation + trimmedLine);

      // Increase indent if line ends with a colon and starts with a block-opening keyword
      if (
        trimmedLine.endsWith(":") &&
        pythonIncreaseIndentKeywords.some((kw) => lower.startsWith(kw))
      ) {
        indentLevel++;
      }
    }
  }

  setCodeByLanguage({
    ...codeByLanguage,
    [activeLanguage]: formattedLines.join("\n"),
  });
};


  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b px-4 py-2 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">1. Two Sum</h1>
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 hover:bg-green-100"
            >
              Easy
            </Badge>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-xs">Submissions</span>
            </Button>
            <Button variant="ghost" size="sm">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span className="text-xs">Like</span>
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span className="text-xs">Discuss</span>
            </Button>
            <Button variant="ghost" size="sm">
              <BookmarkPlus className="h-4 w-4 mr-1" />
              <span className="text-xs">Save</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Problem description */}
        <div className="w-1/2 border-r overflow-y-auto p-6">
          <div className="prose max-w-none">
            <h2 className="text-xl font-bold">Two Sum</h2>
            <p>
              Given an array of integers <code>nums</code> and an integer{" "}
              <code>target</code>, return{" "}
              <em>
                indices of the two numbers such that they add up to{" "}
                <code>target</code>
              </em>
              .
            </p>
            <p>
              You may assume that each input would have{" "}
              <strong>exactly one solution</strong>, and you may not use the
              same element twice.
            </p>
            <p>You can return the answer in any order.</p>

            <h3 className="text-lg font-semibold mt-6">Example 1:</h3>
            <pre className="bg-gray-100 p-3 rounded-md">
              <code>
                <strong>Input:</strong> nums = [2,7,11,15], target = 9{"\n"}
                <strong>Output:</strong> [0,1]{"\n"}
                <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we
                return [0, 1].
              </code>
            </pre>

            <h3 className="text-lg font-semibold mt-4">Example 2:</h3>
            <pre className="bg-gray-100 p-3 rounded-md">
              <code>
                <strong>Input:</strong> nums = [3,2,4], target = 6{"\n"}
                <strong>Output:</strong> [1,2]
              </code>
            </pre>

            <h3 className="text-lg font-semibold mt-4">Example 3:</h3>
            <pre className="bg-gray-100 p-3 rounded-md">
              <code>
                <strong>Input:</strong> nums = [3,3], target = 6{"\n"}
                <strong>Output:</strong> [0,1]
              </code>
            </pre>

            <h3 className="text-lg font-semibold mt-6">Constraints:</h3>
            <ul className="list-disc pl-6">
              <li>
                2 ≤ nums.length ≤ 10<sup>4</sup>
              </li>
              <li>
                -10<sup>9</sup> ≤ nums[i] ≤ 10<sup>9</sup>
              </li>
              <li>
                -10<sup>9</sup> ≤ target ≤ 10<sup>9</sup>
              </li>
              <li>
                <strong>Only one valid answer exists.</strong>
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-6">Follow-up:</h3>
            <p>
              Can you come up with an algorithm that is less than O(n
              <sup>2</sup>) time complexity?
            </p>
          </div>
        </div>

        {/* Code editor */}
        <div className="w-1/2 flex flex-col">
          <Tabs
            defaultValue="javascript"
            className="flex-1 flex flex-col"
            value={activeLanguage}
            onValueChange={handleLanguageChange}
          >
            <div className="border-b px-4">
              <TabsList className="bg-transparent">
                <TabsTrigger
                  value="javascript"
                  className="data-[state=active]:bg-gray-100"
                >
                  JavaScript
                </TabsTrigger>
                <TabsTrigger
                  value="python"
                  className="data-[state=active]:bg-gray-100"
                >
                  Python
                </TabsTrigger>
                <TabsTrigger
                  value="java"
                  className="data-[state=active]:bg-gray-100"
                >
                  Java
                </TabsTrigger>
                <TabsTrigger
                  value="cpp"
                  className="data-[state=active]:bg-gray-100"
                >
                  C++
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 flex flex-col mt-0 p-0">
              <div className="flex-1 p-4" ref={editorRef}>
                <div className="relative h-full">
                  <div className="absolute top-0 right-0 p-2 z-10">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={formatCode}
                      className="text-xs"
                    >
                      <Code className="h-3 w-3 mr-1" />
                      Format
                    </Button>
                  </div>
                  <Editor
                    className="w-full h-full font-mono text-sm bg-gray-50 border "
                    language={activeLanguage}
                    value={codeByLanguage[activeLanguage]}
                    onChange={handleCodeChange}
                    onMount={handleEditorDidMount}
                  />
                </div>
              </div>

              <div className="border-t p-4 bg-white">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="outline">Console</Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Play className="h-4 w-4 mr-1" />
                      Run
                    </Button>
                    <Button>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
