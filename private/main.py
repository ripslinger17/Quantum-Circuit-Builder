import cirq
import json
import matplotlib.pyplot as plt

def load_data(file_path):
    with open(file_path, 'r') as f:
        jsonData = json.load(f)
    return jsonData

def create_circuit(data):
    num_of_qubits = data["numberOfQubits"]
    qubits = cirq.NamedQubit.range(num_of_qubits, prefix='q')
    circuit = cirq.Circuit()

    for gate_info in data["seriesOfGates"]:
        gate_type = gate_info["gate"]
        qubit_index = gate_info["qubit"]

        if gate_type == "H":
            circuit.append(cirq.H(qubits[qubit_index]))
        elif gate_type == "X":
            circuit.append(cirq.X(qubits[qubit_index]))
        elif gate_type == "I":
            circuit.append(cirq.I(qubits[qubit_index]))
        elif gate_type == "Y":
            circuit.append(cirq.Y(qubits[qubit_index]))
        elif gate_type == "Z":
            circuit.append(cirq.Z(qubits[qubit_index]))
        else:
            raise ValueError(f"Unknown gate type: {gate_type}")
    
    circuit.append(cirq.measure(qubits[0]))
    return circuit

def upload_data(result_path, decimal_results, decimal_number):
    data_to_upload = {
        "decimal_results": decimal_results,
        "decimal_number": decimal_number
    }
    with open(result_path, 'w') as f:
        json.dump(data_to_upload, f, indent=4)


if __name__ == '__main__':

    file_path = 'input.json'
    data = load_data(file_path)
    circuit = create_circuit(data)
    # print(circuit)
    sim = cirq.Simulator()
    result = sim.run(circuit, repetitions=data["repetitions"])
    # print(result)

    measurements = result.measurements['q0']
    decimal_results = [int(''.join(str(bit) for bit in measurement), 2) for measurement in measurements]
    # print(decimal_results)
    decimal_number = sum(bit * 2**index for index, bit in enumerate(reversed(decimal_results)))
    # print(decimal_number)

    result_path = 'output.json'
    upload_data(result_path, decimal_results, decimal_number)


    cirq.plot_state_histogram(result, plt.subplot())
    plt.savefig('histogram.png')
    plt.close()