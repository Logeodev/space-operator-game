import uuid from 'react-native-uuid';

const generateUniqueID = () => {
  return `${uuid.v4()}`;
};

export default generateUniqueID;