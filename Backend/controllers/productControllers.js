const Product = require("../models/Product");
const Category = require("../models/Category");
const cloudinary=require('../utils/cloudinary')

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
    const images = req.files?.map(file => ({
      url: file.path,       // URL Cloudinary
      public_id: file.filename, // ID pour suppression
    }));

    // 2️⃣ Créer le produit
    const newProduct = new Product({
      name,
      price,
      stock,
      category,ùimages: images || [],
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
/**
 * @desc    Update product (with image upload support)
 * @route   PUT /api/products/:id
 * @access  Private
 */
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price, stock, category } = req.body;

    // 1️⃣ Vérifier si le produit existe
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 2️⃣ Mettre à jour les champs classiques
    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) {
      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      product.category = category;
    }

    // 3️⃣ Ajouter de nouvelles images si upload
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => ({
        url: file.path,         // URL Cloudinary
        public_id: file.filename, // public_id pour suppression
      }));
      product.images.push(...newImages);
    }

    // 4️⃣ Sauvegarder le produit mis à jour
    const updatedProduct = await product.save();

    // 5️⃣ Réponse
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: await updatedProduct.populate("category", "name"),
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
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
    for (const img of deletedProduct.images) {
  await cloudinary.uploader.destroy(img.public_id);
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
