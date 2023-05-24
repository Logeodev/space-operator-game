import uuid from 'react-native-uuid';

const generateUniqueID = () => {
  return `${uuid.v4()}`;
};

export const generateGameID = () => {
  return Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');
}

export default generateUniqueID;