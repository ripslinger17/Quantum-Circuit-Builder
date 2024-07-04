import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import path from "path";
import { exec } from "child_process";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from 'fs';

// Correctly derive the directory name of the current module.
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies and JSON bodies.
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// Serve static files from the 'public' directory.
app.use(express.static(path.join(__dirname, '../public')));

// Enable CORS for all routes.
app.use(cors());

// Serve the index.html file when accessing the root route.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Path to the shell script that will run the circuit.
const shellScriptPath = './middleware.sh';

// // Original
app.post('/process-circuit', (req, res) => {
    const inputData = req.body;
    console.log('Received:', inputData);

    // Write the received data to input.json file
    fs.writeFile('input.json', JSON.stringify(inputData, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).json({ status: 'error', message: 'Failed to write data to file' });
        }

        console.log('Data written to input.json successfully.');

    });

    exec(shellScriptPath, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error output: ${stderr}`);
            return;
        }
});
});

app.get('/get-results', (req, res) => {
    const filePath = path.join(__dirname, 'output.json'); // Adjust the path as necessary
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error reading output.json:', err);
            return res.status(500).send('Error reading output results.');
        }
        res.json(JSON.parse(data));
        
    });
});

// Start the server.
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});