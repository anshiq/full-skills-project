import { ExecException } from "child_process";

const { exec } = require("child_process");

const exePython = () => {
  const pythonCode = `
def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n - 1)

result = factorial(5)
print( result)
`;
  const escapedPythonCode = pythonCode.replace(/'/g, "\\'");
  const dockerCommand = `docker run --rm -i python /bin/sh -c 'echo "${escapedPythonCode}" > temp.py && python temp.py'`;
  const childProcess = exec(
    dockerCommand,
    (error: ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        console.error(`Execution error: ${error.message}`);
        return;
      }

      console.log(`Execution success. Output: ${stdout}`);
    },
  );
};
exePython();
