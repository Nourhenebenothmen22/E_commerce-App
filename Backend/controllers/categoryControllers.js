const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
        data: null
      });
    }

    // Create new category
    const newCategory = new Category({ name });
    const savedCategory = await newCategory.save();

    // Success response
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: savedCategory
    });
  } catch (error) {
    console.error("Error creating category:", error); // log actual error for debugging
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    // Fetch all categories, optionally populate products
    const categories = await Category.find().populate("products", "name price");

    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      data: null
    });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;

    // Find category by ID and populate products
    const category = await Category.findById(id).populate("products", "name price");

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        data: null
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category
    });
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch category",
      data: null
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;

    // Update category by ID and return updated document
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true })

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        data: null
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update category",
      data: null
    });
  }
};

 exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    // Delete category by ID
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        data: null
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete category",
      data: null
    });
  }
};
