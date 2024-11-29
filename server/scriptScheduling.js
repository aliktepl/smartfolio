const { exec } = require("child_process");
const schedule = require("node-schedule");

// Function to run Python script
function runPythonScript() {
    const command = `cd ../dataSource && .\\myenv\\Scripts\\activate && set PYTHONIOENCODING=utf-8 && python main.py`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}
module.exports = { runPythonScript };

