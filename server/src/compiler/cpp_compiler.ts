import { ExecException, exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const exeCpp = async (cppCode: string, inputText: string) => {
  const escapedCppCode = cppCode.replace(/"/g, '\\"');
  const dockerCommand = `docker run --rm -i gcc /bin/sh -c 'echo "${escapedCppCode}" | g++ -xc++ -o tempExecutable - && echo "${inputText}" | ./tempExecutable'`;

  try {
    const { stdout, stderr }: any = await execAsync(dockerCommand);
    if (stderr) {
      return { result: stderr };
    }
    return { result: stdout };
  } catch (error: any) {
    console.log(error);
    return { result: error.stderr };
  }
};

export { exeCpp };
