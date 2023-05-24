const jwt = require("jsonwebtoken");
const crypt = require("bcryptjs");
const { customer } = require("../models");

// REGISTER USER
exports.register = async (req, res, next) => {
	try {
		const { firstname, lastname, username, email, password } = req.body;
		const hashedPassword = crypt.hashSync(password, 8);

		const input = await customer.create({
			// namaKolom: Value dari variabel yang ditangkap
			firstname: firstname,
			lastname: lastname,
			username: username,
			email: email,
			password: hashedPassword,
		});

		return res.status(201).send({
			message: "Register Success",
		});
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// LOGIN
exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const getData = await customer.findOne({
			where: {
				// namaKolom: Value request
				username: username,
			},
		});

		if (!getData) {
			return res.status(404).send({
				message: "Login failed, user not found!",
			});
		}

		const isPasswordValid = crypt.compareSync(password, getData.dataValues.password);
		if (!isPasswordValid) {
			return res.status(400).send({
				message: "Login failed, wrong password!",
			});
		}

		const token = jwt.sign(
			{
				id: getData.dataValues.id,
				username: getData.dataValues.username,
				email: getData.dataValues.email,
			},
			process.env.JWT_KEY,
			{ expiresIn: 3600 }
		);

		return res.send({
			message: "Sukses Login",
			username: getData.dataValues.username,
			token: token,
		});
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// GET ME
exports.getMe = async (req, res, net) => {
	try {
		const cst = req.customer;
		const getData = await customer.findOne({
			where: { email: cst.email },
		});

		if (!getData) {
			return res.status(404).send({
				message: "User not found",
			});
		}

		// Respon get me success
		return res.status(200).send({
			message: "Get My Profile Success",
			data: getData.dataValues,
		});
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// GET ALL USERS
exports.user = async (req, res, next) => {
	try {
		const getAllUser = await customer.findAll();

		return res.status(200).send({
			message: "Get all user success",
			data: getAllUser,
		});
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};
