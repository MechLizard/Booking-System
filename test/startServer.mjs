//import { exec } from "child_process";
import spawn from 'cross-spawn';

function startProcess(command, args, options = {}) {
    return new Promise((resolve, reject) => {
        const process = spawn(command, args, options);

        process.stdout.on('data', data => {
            console.log(data.toString());
            if (data.toString().includes('Server is running') || data.toString().includes('On Your Network:')) {
                resolve(process);
            }
        });

        process.stderr.on('data', data => {
            console.error(data.toString());
        });

        process.on('error', reject);

        process.on('close', code => {
            if (code !== 0) {
                reject(new Error(`Process exited with code ${code}`));
            }
        });
    });
}

export async function startApp(){
    try {
        //const backendServer = await startProcess('node', ['./MERN/backend_server/server.js']);
        const frontendApp = await startProcess('npm', ['start'], {cwd: './'});
        //return {backendServer, frontendApp}
        return {frontendApp}
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}