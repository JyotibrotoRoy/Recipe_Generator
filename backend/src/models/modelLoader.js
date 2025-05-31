import { PythonShell } from 'python-shell';
import path from 'path';

export function predictCategory(ingredients) {
  return new Promise((resolve, reject) => {
    const options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: './python',  // folder for Python script
      args: [ingredients]
    };

    PythonShell.run('predict.py', options, (err, results) => {
      if (err) return reject(err);
      try {
        const output = JSON.parse(results[0]);
        resolve(output);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}
