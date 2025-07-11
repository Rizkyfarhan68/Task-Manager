const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Koneksi ke MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Set view engine ke EJS
app.set('view engine', 'ejs');

// Static folder untuk CSS/JS
app.use(express.static('public'));

// Parsing form (body)
app.use(express.urlencoded({ extended: true }));

// Routing utama
app.use('/', taskRoutes);

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
