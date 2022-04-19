const {
  connect,
  connection
} = require('mongoose');

// creates database or uses database if already existing 
connect('mongodb://localhost/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;