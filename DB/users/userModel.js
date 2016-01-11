var mongoose = require('mongoose');



var UserSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true
	},
	photo: {
		type: String
	},
	email: {
		type: String,
	},
	friends: {
		type: Array,
		required: false,
	},

	history: {
		type: Array,
		required: false
	}
})


module.exports = mongoose.model('users', UserSchema);