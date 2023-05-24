const knexQuery = require("../model/knex");

// TANPA KNEXT
exports.user = (req, res, next) => {
	console.log(req);

	const name = "Mario Jose";
	const address = "Jakarta";

	res.send({
		message: "Sukses",
		data: {
			nama: name,
			alamat: address,
		},
	});
};

// REGISTER USER KNEXT
exports.register = async (req, res, next) => {
	try {
		const body = req.body;

		const input = await knexQuery("users").insert({
			firstname: body.nama_depan,
			lastname: body.nama_belakang,
			email: body.email,
			password: body.password,
		});

		res.status(201).send({
			message: "Login Success",
		});
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// GET USER KNEXT
exports.getUser = async (req, res, next) => {
	try {
		const idUser = req.params.id;
		const getDataUser = await knexQuery("users")
			.where({
				id: idUser,
			})
			.select("*");
		// console.log(getDataUser);

		if (getDataUser == "") {
			return res.status(404).send({
				message: "Get User Failed, ID Not Detected",
				data: getDataUser,
			});
		}

		res.status(200).send({
			message: "Get User Success",
			data: getDataUser,
		});
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// LOGIN KNEXT
exports.login = (req, res, next) => {
	const body = req.body;

	res.send({
		message: "Sukses Login",
		data: {
			nama: body.nama_lengkap,
			alamat: body.alamat,
		},
	});
};
