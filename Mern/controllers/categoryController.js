import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        success: false,
        message: "Name is required",
      });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(404).send({
        success: false,
        message: "Category already exsists!!",
      });
    }
    const category=await categoryModel.create({
        name,
        slug:slugify(name)
    });
    // const category = await new categoryModel({ name, slug: slugify(name) }).save();
    res.status(200).send({
      success: true,
      message: "Category Successfully Created",
      category,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

const updateCategoryController= async(req,res)=>{
        try {
            const {name}=req.body;
            const {id}=req.params;
            if(!name){
                return res.status(401).send({success:false,message:"Name is required"});
            }

            const category= await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
            res.status(200).send({
              success:true,
              message:"Category Update Successfully!",
              category
            });

            
        } catch (error) {
            res.status('500').send({
                success:false,
                error,
                message:"Error in Update Category--C"
            })
        }
}

const getCategoryController=async(req,res)=>{
  try {
    
    const category=await categoryModel.find({});
    res.status(200).send({
      success:true,
      category,
      message:"Category Retrieval Successfull!"
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      error,
      message:"Error:Retrieving category"
    })
  }
}


const getSingleCategoryController=async(req,res)=>{
  try {
    const {slug,id}=req.params;
    const category=await categoryModel.findOne({slug:slug,_id:id});
    console.log(category,"categoryrryryyr");
    if(!category){
      return res.status(402).send({
        success:false,
        message:"Cannot find Category"
      })
    }
    res.status(200).send({
      success:true,
      category,
      message:"Categories Retrieval Successfull!"
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      error,
      message:"Error:Retrieving categories"
    })
  }
}

const deleteCategoryController=async(req,res)=>{
  try {
    const {id}=req.params;
    const category=await categoryModel.findByIdAndDelete(id);
    if(!category){
      return res.status(402).send({
        success:false,
        message:"Cannot find Category"
      })
    }
    res.status(200).send({
      success:true,
      message:"Deleted Successfully!",
      category
    })
    
    
  } catch (error) {
    res.status(500).send({
      success:false,
      error,
      message:"Error:Deleting Category"
    })
  }
}

export { createCategoryController,updateCategoryController, getCategoryController,getSingleCategoryController,deleteCategoryController};
