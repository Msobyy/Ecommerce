import productModel from "../models/productModel.js";
import slugify from "slugify";
import fs from "fs";

const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, quantity, shipping, category } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res
          .status(401)
          .send({ success: false, message: "Name is required!" });
      case !description:
        return res
          .status(401)
          .send({ success: false, message: "Description is required!" });
      case !price:
        return res
          .status(401)
          .send({ success: false, message: "Price is required!" });
      case !quantity:
        return res
          .status(401)
          .send({ success: false, message: "Quantity is required!" });
      case !shipping:
        return res
          .status(401)
          .send({ success: false, message: "Shipping is required!" });
      case !category:
        return res
          .status(401)
          .send({ success: false, message: "Category is required!" });
      case !photo && photo.size > 1000000:
        return res
          .status(401)
          .send({
            success: false,
            message: "Photo is required & less than 1mb !",
          });
    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    const saveproduct = await product.save();
    if (!saveproduct) {
      return res.status(402).send({
        success: false,
        message: "Error:Product cannot be created",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product created Succesfully!",
      product: saveproduct,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error: Creating Product!",
    });
  }
};

export { createProductController };
