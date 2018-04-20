/**
 * This is only template ...we can create many instance of it
 */
function Profile(username,password,email,gender,photo) {
	this.username=username;
	this.password=password;
	this.email=email;
	this.gender=gender;
	this.photo=photo;
};

/**
 * Exposing profile outside the module
 */
module.exports=Profile;