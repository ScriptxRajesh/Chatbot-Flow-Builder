# Chatbot Flow Builder

This project is a simple and extensible chatbot flow builder using React and React Flow. The flow builder allows users to create and manage chatbot flows by connecting multiple text message nodes. 
Techstack used : ReactJS, Tailwind CSS, React Flow, Roact Icons, React Toastify, React Hooks.

Find the project @ : [https://chatbot-flow-builder-383r-rajeshpuramaneni127s-projects.vercel.app/](https://chatbot-flow-builder-383r-rajeshpuramaneni127s-projects.vercel.app/)


## Overview

This chatbot flow builder is designed to be a visual tool for creating chatbot conversation flows. Users can add text message nodes, connect them with edges, and save their configurations. The project is built using React and React Flow, providing a robust and interactive user interface for managing chatbot flows.

## Features

1. **Text Node**
    - Supports adding multiple text message nodes in one flow.
    - Nodes can be added to the flow by dragging and dropping from the Nodes Panel.

2. **Nodes Panel**
    - Houses all types of nodes supported by the flow builder.
    - Currently supports only Message Nodes, with provisions to add more node types in the future.

3. **Edge**
    - Connects two nodes together.
    - Ensures only one edge originates from a source handle.

4. **Source Handle**
    - The starting point of a connecting edge.
    - Can have only one edge originating from it.

5. **Target Handle**
    - The ending point of a connecting edge.
    - Can have multiple edges connecting to it.

6. **Settings Panel**
    - Replaces the Nodes Panel when a node is selected.
    - Allows editing the text of the selected Text Node.

7. **Save Button**
    - Saves the current flow configuration.
    - Shows an error if there are unconnected nodes when attempting to save.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
   
   ``` bash
   git clone https://github.com/ScriptxRajesh/Chatbot-Flow-Builder.git
   cd Chatbot-Flow-Builder
   ```
2. Install the dependencies:
   
   ``` bash
   npm install
   ```
3. Start the development server:
   
   ``` bash
   npm run dev
   ```

## Screenshots

#Home Page
![image](https://github.com/user-attachments/assets/40708ab9-b7b6-4b98-8a57-31f361391f1b)

#Message Change
![image](https://github.com/user-attachments/assets/e917a434-5dd7-4948-83df-91a392e0fc1e)

#Error
![image](https://github.com/user-attachments/assets/7983d1b6-ea32-4079-8f5f-d0d4b8ebc186)


Future Improvements
- Add support for more node types.
- Implement undo/redo functionality.
- Improve the user interface and user experience.
- Add more validation checks for node connections.

# Contact details 
- Portfolio : https://script-x-rajesh.web.app/
- Resume : https://drive.google.com/file/d/12-omWkgCsDXi1Ein1wWlww-puGZG3S5w/view
- LinkedIn : https://www.linkedin.com/in/rajesh127/
