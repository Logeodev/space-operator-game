const ipAdress = "192.168.56.1:5000"
const connString = `http://${ipAdress}/api`;
export const connStringWs = `ws://${ipAdress}`;
export default connString;