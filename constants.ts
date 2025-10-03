export const INITIAL_APP_CODE = `import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>
          Describe the app you want to build in the chat.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827', // Dark background
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#9CA3AF', // Lighter gray text
    textAlign: 'center',
  },
});`;

export const INITIAL_WEB_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #111827;
            color: #ffffff;
            text-align: center;
        }
        .container {
            padding: 2rem;
        }
        h1 {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }
        p {
            font-size: 1.2rem;
            color: #9CA3AF;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome!</h1>
        <p>Describe the web page you want to build in the chat.</p>
    </div>
</body>
</html>`;


export const MOBILE_SYSTEM_INSTRUCTION = `You are an expert React Native developer. You will be given a prompt to create a mobile application. Your task is to generate the complete, production-ready code for the 'App.js' file. The code should be self-contained in a single file and use React Native components. Ensure the app is visually appealing and functional. Respond ONLY with the requested JSON object containing the code and a brief, friendly message. Do not include any explanations, apologies, or introductory text outside of the JSON structure.`;

export const WEB_SYSTEM_INSTRUCTION = `You are an expert web developer. You will be given a prompt to create a web application. Your task is to generate the complete, production-ready code for a single 'index.html' file. The code must be self-contained. All CSS must be in a <style> tag in the <head>, and all JavaScript must be in a <script> tag at the end of the <body>. Ensure the app is visually appealing and functional. Respond ONLY with the requested JSON object containing the HTML code and a brief, friendly message. Do not include any explanations, apologies, or introductory text outside of the JSON structure.`;
