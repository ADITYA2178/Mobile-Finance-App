#!/usr/bin/env node

/**
 * Resets the React Native starter template to a blank App.tsx.
 * You can remove the `reset-project` script from package.json and delete
 * this file after running it.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const root = process.cwd();
const exampleDir = 'app-example';
const starterFiles = ['App.tsx'];

const blankAppContent = `import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text>Edit App.tsx to start building your app.</Text>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const resetProject = async userInput => {
  try {
    const exampleDirPath = path.join(root, exampleDir);

    if (userInput === 'y') {
      await fs.promises.mkdir(exampleDirPath, { recursive: true });
      console.log(`📁 /${exampleDir} directory created.`);
    }

    for (const file of starterFiles) {
      const oldPath = path.join(root, file);

      if (!fs.existsSync(oldPath)) {
        console.log(`➡️ /${file} does not exist, skipping.`);
        continue;
      }

      if (userInput === 'y') {
        const newPath = path.join(exampleDirPath, file);
        await fs.promises.rename(oldPath, newPath);
        console.log(`➡️ /${file} moved to /${exampleDir}/${file}.`);
      } else {
        await fs.promises.rm(oldPath, { force: true });
        console.log(`❌ /${file} deleted.`);
      }
    }

    await fs.promises.writeFile(path.join(root, 'App.tsx'), blankAppContent);
    console.log('📄 Blank App.tsx created.');

    console.log('\n✅ Project reset complete. Next steps:');
    console.log('1. Run `npm start` to start Metro.');
    console.log('2. Edit App.tsx to build your app.');
    if (userInput === 'y') {
      console.log(
        `3. Delete the /${exampleDir} directory when you no longer need the starter as a reference.`,
      );
    }
  } catch (error) {
    console.error(`❌ Error during script execution: ${error.message}`);
  }
};

rl.question(
  'Do you want to move existing starter files to /app-example instead of deleting them? (Y/n): ',
  answer => {
    const userInput = answer.trim().toLowerCase() || 'y';
    if (userInput === 'y' || userInput === 'n') {
      resetProject(userInput).finally(() => rl.close());
    } else {
      console.log("❌ Invalid input. Please enter 'Y' or 'N'.");
      rl.close();
    }
  },
);
