const jwt = require("jsonwebtoken");
const { customer } = require("../models");

exports.verifyToken = async (req, res, next) => {
	try {
		const jwtToken = req.headers["authorization"];

		if (!jwtToken) {
			return res.status(400).send({
				message: "No JWT Token Provided",
			});
		}

		const verify = jwt.verify(jwtToken.split(" ")[1], process.env.JWT_KEY);
		if (!verify) {
			return res.status(403).send({
				message: "Failed to Authentication JWT Token",
			});
		}

		req.customer = verify;
		console.log(req.customer);
		next();
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error,
		});
	}
};

exports.verifyAdmin = async (req, res, next) => {
	try {
		const getData = await customer.findOne({
			where: req.customer.id,
		});

		if (getData.dataValues.roles !== "admin") {
			return res.status(403).send({
				message: "You not authorized, this endpoint for admin",
			});
		}

		next();
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error,
		});
	}
};
