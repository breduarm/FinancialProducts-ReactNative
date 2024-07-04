import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';

const Search = (): React.JSX.Element => {
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={setSearchText}
        value={searchText}
        placeholder="Search..."
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ECECED',
    padding: 10,
    borderRadius: 4,
  },
});

export default Search;
