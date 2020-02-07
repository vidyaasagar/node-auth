var mongoose = require('mongoose');

var rolesSchema = mongoose.Schema({
  id: Number,
  name: String,
});

mongoose.model('Roles', rolesSchema);