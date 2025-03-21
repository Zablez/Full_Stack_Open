
const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://admin123:${password}@cluster0.qcxfm.mongodb.net/phonebook`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Phone = mongoose.model('phones', phoneBookSchema);

if (process.argv.length === 3) {
  Phone.find({}).then((result) => {
    console.log('phonebook:');
    result.forEach((phone) => {
      console.log(`${phone.name} ${phone.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const phone = new Phone({
    name,
    number,
  });

  phone.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log('Invalid arguments');
  process.exit(1);
}
