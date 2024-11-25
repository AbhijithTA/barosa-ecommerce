import Category from "../models/categories.js";
import SubCategory from "../models/SubCategories.js";

// //===============================================================================================================================================================================//
// subcategory creation

export async function createSubCategory(req, res) {
  const { name, categoryId } = req.body;

  //validation
  if (!name || !categoryId) {
    return res.status(400).json({ error: "Name and Category are required" });
  }

  try {
    const categoryExists = await Category.findById(categoryId);

    if (!categoryExists) {
      return res.status(404).json({ error: "Category not found" });
    }

    //checking if the subcategory with the same category already exists
    const duplicateSubCategory = await SubCategory.findOne({
      name,
      category: categoryId,
    });

    if (duplicateSubCategory) {
      return res.status(400).json({
        error:
          "SubCategory with the same name already exists for the same category",
      });
    }

    const SavingsubCategory = new SubCategory({
      name,
      category: categoryId,
    });

    const savedSubCategory = await SavingsubCategory.save();

    res.status(201).json({
      message: "SubCategory created successfully",
      subCategory: savedSubCategory,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occured while creating the SubCategory", err });
  }
}

//===============================================================================================================================================================================//

// category creation

export async function createCategory(req, res) {
  const { name, subCategory } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ error: "Name and SubCategory are required" });
  }

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(400)
        .json({ error: "Category with the same name already exists" });
    }

    const category = new Category({ name, subCategory: subCategory || [] });
    const savedCateogry = await category.save();

    res.status(201).json({
      message: "Category created successfully",
      category: savedCateogry,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ error: "An error occured while creating the Category", err });
  }
}

//===============================================================================================================================================================================//

//subcategory adding to category

export async function add_subcategory_to_category(req, res) {
  const { categoryId, subCategoryId } = req.body;

  if (!categoryId || !subCategoryId) {
    return res
      .status(400)
      .json({ error: "category and subCategory are required" });
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $addToSet: { subCategory: subCategoryId } },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res
      .status(200)
      .json({
        message: "Category updated successfully",
        category: updatedCategory,
      });
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occured while updating the Category", err });
  }
}


//===============================================================================================================================================================================//