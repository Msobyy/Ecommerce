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
      case photo && photo.size > 1000000:
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
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error: Creating Product!",
    });
  }
};

const updateProductController=async(req,res)=>{
  try {
    const { name, slug, description, price, quantity, shipping, category } =
      req.fields;
    const { photo } = req.files;
    const {pid}=req.params;

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
      case photo && photo.size > 1000000:
        return res
          .status(401)
          .send({
            success: false,
            message: "Photo should be less than 1mb !",
          });
    }
    const product = await productModel.findByIdAndUpdate(pid,{...req.fields,slug:slugify(name)},{new:true})
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    const saveproduct = await product.save();
    if (!saveproduct) {
      return res.status(402).send({
        success: false,
        message: "Error:Product cannot be Updated",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product updated Succesfully!",
      product: saveproduct,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error: Updating Product!",
    });
  }
}

const getAllProductController=async(req,res)=>{
  try {
      const products=await productModel.find({}).populate("category").select("-photo").limit(12).sort({createdAt:-1});
      if(!products){
        return res.status(402).send({
          success:false,
          message:"Error while getting products",
        })
      }
      res.status(200).send({
        success:true,
        message:"Products Retrievel Successfull!",
        products,
        count:products.length
      })
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"Error: Getting Products",
      error
    })
  }
}


const getSingleProductController=async(req,res)=>{
  try {
    const {pid}=req.params;
    const product=await productModel.findById(pid).select("-photo").populate("category");
    if(!product){
      return res.status(402).send({
        success:false,
        message:"Error while getting product",
      })
    }
    res.status(200).send({
      success:true,
      message:"Product Retrievel Successfull!",
      product,
    })
    
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"Error: Getting Product",
      error
    })
  }
}

const getProductPhotoController=async(req,res)=>{
  try {
    const {pid}=req.params;
    const productPhoto=await productModel.findById(pid).select("photo");
    if(!productPhoto || !productPhoto.photo.data){
      return res.status(402).send({
        success:false,
        message:"Error while getting product photo",
      })
    }
    res.set("Content-type",productPhoto.photo.contentType);
    res.status(200).send(productPhoto.photo.data)
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"Error: Getting Product photo",
      error
    })
  }
}

const deleteProductController=async(req,res)=>{
  try {
    const {pid}=req.params;
    const product=await productModel.findByIdAndDelete(pid);
    if(!product){
      res.status(402).send({
        success:false,
        message:"Error:Cannot find product"
      })
    }
    res.status(200).send({
      success:true,
      message:"Product deleted successfully!",
      product
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"Server Error: Deleting Product",
      error
    })
  }
}
export { createProductController,getAllProductController,getSingleProductController,getProductPhotoController,deleteProductController,updateProductController };
