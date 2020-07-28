import moment from 'moment';

const timeStamp = () => moment().format('DDMMYYYY_hhmmss');

// eslint-disable-next-line import/prefer-default-export
export { timeStamp };
