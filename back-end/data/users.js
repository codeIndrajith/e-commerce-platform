import bcrypt from 'bcryptjs';

// dummy user create to check the process

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('1234', 10),
    isAdmin: true,
  },
  {
    name: 'Indrajith Bodhinayaka',
    email: 'indra@gmail.com',
    password: bcrypt.hashSync('1234', 10),
    isAdmin: false,
  },
  {
    name: 'Nethumi Udari',
    email: 'nethumi@gmail.com',
    password: bcrypt.hashSync('1234', 10),
    isAdmin: false,
  },
];

export default users;
