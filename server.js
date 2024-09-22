const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Загружаем переменные окружения из .env файла

const app = express();
const PORT = process.env.PORT || 5000;

// Используем правильную строку подключения в зависимости от окружения
const dbURI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI_PRODUCTION // Используем переменную для удалённой базы в production
    : process.env.MONGODB_URI; // Используем локальную базу данных

// Подключение к MongoDB
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to MongoDB at ${dbURI}`);
  })
  .catch(err => {
    console.error('Connection error', err);
  });

// Middleware для обработки JSON и CORS
app.use(cors());
app.use(express.json());

// Модель для коллекции campers
const camperSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  rating: Number,
  location: String,
  description: String,
  form: String,
  length: String,
  width: String,
  height: String,
  tank: String,
  consumption: String,
  transmission: String,
  engine: String,
  AC: Boolean,
  bathroom: Boolean,
  kitchen: Boolean,
  TV: Boolean,
  radio: Boolean,
  refrigerator: Boolean,
  microwave: Boolean,
  gas: Boolean,
  water: Boolean,
  gallery: Array,
  reviews: Array,
});

const Camper = mongoose.model('Camper', camperSchema);

// Маршрут для получения всех campers
app.get('/api/campers', async (req, res) => {
  try {
    const campers = await Camper.find();
    res.json(campers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
