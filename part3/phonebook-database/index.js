
require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Phone = require('./models/phone')

app.use(express.json())

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      `${JSON.stringify(req.body)}`,
    ].join(' ')
  })
)

const cors = require('cors')

app.use(cors())

app.get('/api/persons', async (request, response) => {
  const persons = await Phone.find({})
  response.json(persons)
})

app.post('/api/persons', async (request, response, next) => {
  const { name, number } = request.body;

  console.log(request.body);

  if (!name || !number) {
    response.status(400).json({ error: 'name & number is required' });
    return;
  }

  Phone.findOne({ name })
    .then((phone) => {
      console.log(phone);
      if (phone) {
        response.status(500).json({ error: 'Name already exits', phone });
      }else{
        throw new Error()
      }
    })
    .catch(() => {
      const newPhone = new Phone({
        name,
        number,
      });

      newPhone
        .save()
        .then(() => {
          response.status(200).send('Person added');
        })
        .catch((error) => {
          next(error);
        });
    });
});

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const { name, number } = request.body

  if (!name || !number) {
    response.json({ error: 'name & number is required' })
    return
  }

  const regrex = /^\d{2,3}-\d+$/

  if (regrex.test(number)) {
    response
      .status(400)
      .json({ error: 'Invalid phone number. Format should be DDD-DDD...' })
  }

  const newPhone = {
    name,
    number,
  }

  Phone.findByIdAndUpdate(id, newPhone, { new: true, runValidators: true })
    .then((updatedNote) => {
      response.send(`${updatedNote.name} number updated`)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Phone.findOne({ _id: id })
    .then((returneditem) => {
      response.json(returneditem)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Phone.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.get('/info', (request, response) => {
  Phone.find({}).then((returnedData) => {
    const numberOfPhone = returnedData.length

    response.send(
      `Phone book has info for ${numberOfPhone} people<br><br>${Date()}`
    )
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)
