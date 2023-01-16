const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/siteData')
    .then(() => console.log("connected to mongo DB"))
    .catch(() => console.log('Problems acurred while connecting to mongo DB')); 