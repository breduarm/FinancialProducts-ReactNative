import React, {Dispatch, SetStateAction, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Colors from '../theme/ColorSqueme';

type SearchProps = {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
};

const Search = ({
  searchText,
  setSearchText,
}: SearchProps): React.JSX.Element => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={setSearchText}
      value={searchText}
      placeholder="Search..."
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    padding: 10,
    borderRadius: 4,
  },
});

export default Search;
