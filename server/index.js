const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const proxyRoutes = require('./routes/proxy');
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/proxy', proxyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));