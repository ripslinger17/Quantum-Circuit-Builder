# Quantum-Circuit-Builder

## Table of Contents

1. [Introduction](#introduction)
    - [Need for Quantum Circuit Builder](#need-for-quantum-circuit-builder)
2. [Overview](#overview)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Frontend](#frontend)
    - [Interface Layout](#interface-layout)
    - [Drag-and-Drop Functionality](#drag-and-drop-functionality)
    - [Number of Shots](#number-of-shots)
    - [Send and Reset Buttons](#send-and-reset-buttons)
    - [Results Display](#results-display)
6. [Backend](#backend)
    - [Server Setup](#server-setup)
    - [API Endpoints](#api-endpoints)
7. [Python Processing](#python-processing)
    - [Data Loading](#data-loading)
    - [Circuit Creation](#circuit-creation)
    - [Simulation](#simulation)
    - [Result Handling](#result-handling)
8. [Middleware](#middleware)
9. [Notes](#notes)
10. [Future Enhancements](#future-enhancements)
11. [FAQ](#faq)

---

## Introduction

The Quantum Circuit Builder is a web application designed to help users create and simulate quantum circuits using a simple drag-and-drop interface. It allows users to place quantum gates on qubits, configure the number of shots (repetitions) for the simulation, and view the results.

### Need for Quantum Circuit Builder

As quantum computing rapidly advances, there is a growing need for accessible tools that can help both beginners and experts design and simulate quantum circuits. Traditional methods of quantum circuit creation often require extensive coding knowledge and a deep understanding of quantum mechanics. This software bridges the gap by providing an intuitive interface that simplifies the process of building quantum circuits. By enabling users to visually construct circuits and quickly simulate their behavior, the Quantum Circuit Builder accelerates learning, aids in prototyping, and democratizes access to quantum computing technology.

## Overview

This application consists of three main parts:
1. **Frontend**: Provides a user interface for creating quantum circuits and viewing results.
2. **Backend**: Handles API requests from the frontend and communicates with the Python script.
3. **Python Processing**: Processes the quantum circuit data and simulates the circuit using the Cirq library.

## Installation

1. Clone the repository to your local machine.
2. Ensure you have the required dependencies installed:
    - Python 3.x
    - Cirq library
    - Node.js and Express
3. Navigate to the project directory and install the required Node.js dependencies using `npm install`.

## Usage

1. Start the backend server.
2. Open the frontend in a web browser.
3. Use the drag-and-drop interface to create a quantum circuit.
4. Set the number of shots for the simulation.
5. Click the "Send" button to process the circuit.
6. View the results displayed in the frontend.

## Frontend

### Interface Layout

The frontend is composed of several key sections:
- **Header**: Contains the title of the application.
- **Gate Container**: Contains draggable quantum gates (H, X, Y, Z, I).
- **Circuit Container**: Contains qubits where users can drop gates.
- **Controller**: Allows users to set the number of shots and provides buttons for sending and resetting the circuit.
- **Results Section**: Displays the results of the quantum circuit simulation.

### Drag-and-Drop Functionality

Users can drag quantum gates from the Gate Container and drop them onto the Qubit lines in the Circuit Container. Each gate represents a quantum operation (e.g., H for Hadamard, X for Pauli-X).

### Number of Shots

Users can set the number of shots, which determines how many times the quantum circuit is simulated. This is done through an input field in the Controller section.

### Send and Reset Buttons

- **Send Button**: Sends the circuit data to the backend for processing.
- **Reset Button**: Clears the circuit and resets the interface.

### Results Display

After processing, the results are fetched from the backend and displayed in the Results Section. This includes the measurement results of the quantum circuit.

## Backend

### Server Setup

The backend server is built using Node.js and Express. It handles incoming API requests from the frontend and triggers the Python script to process the quantum circuit data.

### API Endpoints

The backend provides two main API endpoints:
- **POST /process-circuit**: Receives the quantum circuit data from the frontend, saves it to a file, and runs the Python script to process it.
- **GET /get-results**: Fetches the results of the quantum circuit simulation from a file and sends them back to the frontend.

## Python Processing

### Data Loading

The Python script reads the JSON data file containing the quantum circuit configuration. This data includes the number of qubits, the series of gates to apply, and the number of shots for the simulation.

### Circuit Creation

Using the Cirq library, the script creates a quantum circuit based on the provided data. It maps each gate to the corresponding qubit and constructs the circuit accordingly.

### Simulation

The script simulates the quantum circuit using Cirq's Simulator. The simulation is run for the specified number of shots, and the measurement results are collected.

### Result Handling

After the simulation, the script processes the measurement results and converts them into a human-readable format. These results are saved to a JSON file for the backend to fetch and send to the frontend.

## Middleware

A middleware script is used to execute the Python script. This script is triggered by the backend after receiving the circuit data from the frontend. It ensures the Python script runs in a controlled environment and handles any necessary setup.

## Notes

- Ensure the backend server is running before using the frontend.
- The Python script requires the Cirq library (and Matplotlib if you want to visualise and check whether the code is working properly or not) for processing the quantum circuit simulation.
- Adjust the URLs in the frontend JavaScript file to match your backend server configuration.

## Future Enhancements

The Quantum Circuit Builder is set to receive several exciting updates to enhance its functionality and user experience:

- **Dynamically Add or Remove Qubits**: Enable users to modify the number of qubits in their circuits easily.
- **Improve GUI**: Enhance the graphical user interface for better usability and aesthetics.
- **Show Visualization of Distribution**: Integrate visual tools to display quantum state distributions.
- **Option to add Noise**: Provide a option to run the circuit with noise or without noise
- **Option to Run on Different Processors**: Provide compatibility with various quantum computing frameworks like Cirq and Qiskit.
- **Option to Retrieve State vectors**: Provide a option to retrieve state vectors from the circuit.
- **Improve Code Readability**: Refactor code for better clarity and maintainability.
- **Add More Gates**: Introduce additional quantum gates to expand circuit-building capabilities.
- **Bloch Sphere for Each Qubit**: Visualize the state of each qubit using Bloch Sphere representations.
- **Improve Code Quality for Responsiveness and Deployment**: Enhance code quality to ensure better responsiveness and easier deployment.

## FAQ

**Q: What are your future plans related to this project?**  
**A:** I am planning to build my own simulator similar to Qiskit and Cirq, enhancing the functionalities and performance of the current application. I will also add that simulator in the simulator list so that anyone can use my simulator without any hassle.

**Q: Why have you added only one gate?**  
**A:** This project is a prototype developed for a college project with a tight deadline. To save time and reduce complexity, I opted to include a minimal set of features initially.

**Q: Why are there fewer gates available in the current version?**  
**A:** Implementing more complex gates like CNOT and Swap requires a two-qubit structure, which is time-consuming. Due to time constraints, these gates are not included in the initial version but I *promise* to add that will be added in future updates.