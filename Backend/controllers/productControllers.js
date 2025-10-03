const Product = require("../models/Product");
const Category = require("../models/Category");

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Public/Private (selon auth)
 */
exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock, category } = req.body;

    // 1️⃣ Vérifier si la catégorie existe
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // 2️⃣ Créer le produit
    const newProduct = new Product({
      name,
      price,
      stock,
      category,
    });

    const savedProduct = await newProduct.save();

    // 3️⃣ Lier le produit à la catégorie
    await Category.findByIdAndUpdate(category, {
      $push: { products: savedProduct._id },
    });

    // 4️⃣ Réponse succès
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

/**
 * @desc    Get product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id).populate("category", "name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private
 */
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("category", "name");

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private
 */
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Retirer le produit de la catégorie
    await Category.findByIdAndUpdate(deletedProduct.category, {
      $pull: { products: deletedProduct._id },
    });

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};
