import React from 'react';
import {View} from 'react-native';

type SpacerProps = {
    value: number,
}

const Spacer = ({value}: SpacerProps): React.JSX.Element => {
  return <View style={{height: value}}/>;
};

export default Spacer;
