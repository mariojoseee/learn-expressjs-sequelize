const { customer, post } = require("../models");

// CREATE POST
exports.createPost = async (req, res, next) => {
	try {
		const { title, body } = req.body;

		// Validate request
		if (title && body == "") {
			res.status(400).send({
				message: "Content can not be empty!",
			});
			return;
		}

		const input = await post.create({
			user_id: req.customer.id,
			title: title,
			body: body,
		});
		const getData = await customer.findOne({
			where: {
				id: req.customer.id,
			},
		});

		return res.status(201).send({
			message: "Create Post Success",
			postCreatedBy: `${getData.dataValues.firstname} ${getData.dataValues.lastname}`,
		});
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// READ POST BY ID USER
exports.readPostUser = async (req, res, next) => {
	try {
		const id = req.customer.id;
		const postUser = await post.findAll({
			where: { user_id: id },
		});

		if (!postUser) {
			return res.status(404).send({
				message: "User not found",
			});
		}

		// Respon get user success
		return res.status(200).send({
			message: "Here's a post you've made",
			data: postUser,
		});
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// UPDATE POST
exports.updatePost = async (req, res, next) => {
	try {
		const { title, body } = req.body;
		const idPost = req.params.id;

		const postUser = await post.findOne({
			where: { id: idPost },
		});

		// CEK ID USER
		if (postUser.dataValues.user_id !== req.customer.id) {
			return res.status(404).send({
				message: "Posts cannot be updated. Post not available",
			});
		}

		const update = await post.update(req.body, {
			where: { id: idPost },
		});

		return res.status(200).send({
			message: "Data post successfully updated",
			data: {
				title: title,
				body: body,
			},
		});
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};

// DELETE POST
exports.deletePost = async (req, res, next) => {
	try {
		const idPost = req.params.id;
		const postUser = await post.findOne({
			where: { id: idPost },
		});

		// CEK ID USER
		if (postUser.dataValues.user_id !== req.customer.id) {
			return res.status(404).send({
				message: "Posts cannot be deleted. Post not available",
			});
		}

		const hapus = await post.destroy({
			where: { id: idPost },
		});

		return res.status(200).send({
			message: "Data post successfully deleted",
		});
	} catch (error) {
		res.status(500).send({
			message: "An Error Occured",
			data: error.message,
		});
	}
};
