document.addEventListener('DOMContentLoaded', () => {
    const gates = document.querySelectorAll('.gate');
    const qubits = document.querySelectorAll('.qubit');
    const sendButton = document.getElementById('send');
    const resetButton = document.getElementById('reset');
    const resultSection = document.getElementById('result-section');


    gates.forEach(gate => {
        gate.addEventListener('dragstart', dragStart);
    });

    qubits.forEach(qubit => {
        qubit.addEventListener('dragover', dragOver);
        qubit.addEventListener('drop', dropGate);
    });

    sendButton.addEventListener('click', sendData);
    // fetchResultsButton.addEventListener('click', fetchResults);
    resetButton.addEventListener('click',allReset);

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.dataset.gate);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function dropGate(event) {
        event.preventDefault();
        const gateType = event.dataTransfer.getData('text/plain');
        const qubit = event.target.dataset.qubit;

        // Create the dropped gate element
        const droppedGate = document.createElement('div');
        droppedGate.classList.add('dropped-gate');
        droppedGate.textContent = gateType;

        event.target.appendChild(droppedGate);
    }
// Original
    function sendData() {
        const circuitData = [];
        qubits.forEach(qubit => {
            const gates = [];
            qubit.querySelectorAll('.dropped-gate').forEach(gateElement => {
                gates.push(gateElement.textContent);
            });
            circuitData.push({ qubit: qubit.dataset.qubit, gates });
        });
    
        // Retrieve the number of shots from the input field
        const shotsInput = document.getElementById('shots');
        const shots = shotsInput ? parseInt(shotsInput.value, 10) : 1000;

        const seriesOfGates = circuitData.flatMap((qubitData, qubitIndex) => 
            qubitData.gates.map(gate => ({
                gate: gate,
                qubit: qubitIndex
            }))
        );
        
        const jsonData = {
            numberOfQubits: qubits.length,
            seriesOfGates: seriesOfGates,
            repetitions: shots // Use the retrieved shots value
        };
        fetch('http://localhost:3000/process-circuit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Output:', data);
            // Handle the output data as needed
            fetchResults(); // Fetch results after successful sendData operation
        })
        .then(data => {
            console.log('Output:', data);
            // Handle the output data as needed
        })
        .catch(error => {
            console.error('Error:', error);
            // Hide loading screen also in case of error
        });
        console.log('Data sent.');
        const timeOutForFetch = setTimeout(fetchResults, 2000); // Add this line
    }
    
    function fetchResults() {
        fetch('http://localhost:3000/get-results') // Adjust the URL/path as necessary
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch results');
            }
            return response.json();
        })
        .then(data => {
            // resultSection.textContent = JSON.stringify(data, null, 2); // Displaying the raw JSON data for simplicity
            const resultsString = `Decimal Results: ${data.decimal_results.join(', ')}\nDecimal Number: ${data.decimal_number}`;
            resultSection.textContent = resultsString; // Displaying the formatted string
        })
        .catch(error => {
            console.error('Error fetching results:', error);
        });
        console.log('Results Fetched.');
    }

    function allReset()
    {
        // Reset the UI for gates and qubits
        qubits.forEach(qubit => {
            // Remove all dropped gates from each qubit
            qubit.querySelectorAll('.dropped-gate').forEach(droppedGate => {
                droppedGate.remove();
                resultSection.textContent = ''; // Clear the results section
            });
        });

        console.log('Circuit reset.');
    }
});
