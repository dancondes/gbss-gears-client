import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";

export default [
  js.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Detect unused variables
      "no-unused-vars": ["warn", { 
        vars: "all", 
        args: "after-used", 
        ignoreRestSiblings: true 
      }],
      
      // Detect undefined variables
      "no-undef": "error",
      
      // React specific rules
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/prop-types": "warn",
      
      // General code quality
      "no-console": ["error", { allow: ["error"] }], // Disallow console, but allow console.error
    },
  },
];
