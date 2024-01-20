import { ExecException, exec } from "child_process";

const exeJava = () => {
  const javaCode = `
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
`;

  // Escape double quotes in the Java code for use in the Docker command
  const escapedJavaCode = javaCode.replace(/"/g, '\\"');

  // Command to run Docker container with Java and execute the compilation and execution
  const dockerCommand = `docker run --rm -i openjdk /bin/sh -c 'echo "${escapedJavaCode}" > HelloWorld.java && javac HelloWorld.java && java HelloWorld'`;

  // Execute the Docker command
  const childProcess = exec(
    dockerCommand,
    (error: ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        console.error(`Execution error: ${error.message}`);
        // Handle errors depending on your use case
        return;
      }

      console.log(`Execution success. Output: ${stdout}`);
      // Handle the output depending on your use case
    },
  );
};

// Calling the function to test it
exeJava();
