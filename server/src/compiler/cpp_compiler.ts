import { ExecException, exec } from "child_process";
const exeC = () => {
  const cppCode = `
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
`;

  // Escape double quotes in the C++ code for use in the Docker command
  const escapedCppCode = cppCode.replace(/"/g, '\\"');

  // Command to run Docker container with GCC and execute the compilation and execution
  const dockerCommand = `docker run --rm -i gcc /bin/sh -c 'echo "${escapedCppCode}" | g++ -xc++ -o tempExecutable - && ./tempExecutable'`;

  // Execute the Docker command
  const childProcess = exec(
    dockerCommand,
    (error: ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        console.error(`Compilation error: ${error.message}`);
        // Handle errors depending on your use case
        return;
      }

      console.log(`Compilation success. Output: ${stdout}`);
      // Handle the output depending on your use case
    },
  );
};

// Calling the function to test it
exeC();
