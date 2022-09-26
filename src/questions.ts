const questions = [
  {
    type: 'confirm',
    name: 'isStartConfirmed',
    message:
      'Are you sure you would like to start the ETL process? This will clear the database.',
    default: false,
  },
];

export default questions;
