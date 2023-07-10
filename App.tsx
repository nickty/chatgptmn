/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [inputMessage, setInputMessage] = useState('');
  const [outputMessage, setOutputMessage] = useState("Results to be shown here");

  const handleButtonClick = () => {
    console.log('clicked');
    console.log(inputMessage);
    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer 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',
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: inputMessage,
      }),
    })
      .then(res => res.json())
      .then(data => {
        setOutputMessage(data.choices[0].text.trim())
        console.log(data.choices[0].text)
      });
  };
  //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
  const handleTextInput = text => {
    // console.log("first", text)
    setInputMessage(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', marginBottom: 20}}>
        <Text>{outputMessage}</Text>
      </View>
      <View style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <View
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 15}}>
          <TextInput
            onChangeText={handleTextInput}
            placeholder="Enter your questions"
          />
        </View>

        <TouchableOpacity onPress={handleButtonClick} style={{padding: 20}}>
          <View style={{backgroundColor: 'green', padding: 15, borderRadius: 10}}>
            <Text style={{ color: 'white'}}>Send</Text>
          </View>
        </TouchableOpacity>
      </View>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
    </SafeAreaView>
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
