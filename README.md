# LitterAlly

Welcome to LitterAlly, a React Native Expo app designed to help people dispose of waste properly and contribute to a cleaner environment. Our mission is to provide an easy-to-use platform that educates users on waste management and promotes eco-friendly habits.

## Features

- **Photo Sorting**: Take a picture of waste and AI will find out how to dispose of it locally.
- **Text Sorting**: Search an item and AI will find out how to dispose of it locally.
- **Waste Sorting Guide**: Interactive guide to help you sort your waste correctly - recyclables, compostables, landfills and more.
- **Educational Articles**: Read environmental articles written by high school students.

## Installation

LitterAlly is built using React Native and Expo, which simplifies the setup and running of the application. To run LitterAlly locally, follow these steps:

### Prerequisites

- Node.js (LTS version)
- npm or Yarn
- Expo CLI

### Setting Up

1. Clone the repository:
   ```
   git clone https://github.com/jadenScali/litterAlly.git
   ```
2. Navigate to the project directory:
   ```
   cd LitterAlly
   ```
3. Install dependencies:
- Using npm:
  ```
  npm install
  ```
  
- Using Yarn:
  ```
  yarn install
  ```
  
4. (Optional: To use AI features) Create a .env file in the root directory and add your openAI api key:
   ```
   API_KEY=your_api_key
   ```

### Running the Application

With Expo CLI installed, you can run the app using the following command:

- Using npm:
  ```
  npx expo start
  ```
  
- Using Yarn:
  ```
  yarn expo start
  ```
  
This command starts the development server and opens a new tab in your web browser with the Expo developer tools. From here, you can run the application on a physical device using the Expo Go app or on an emulator/simulator.
