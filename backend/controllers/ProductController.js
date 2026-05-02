const mongoose = require('mongoose');
const Product = require('../models/product');
const Cart = require('../models/cart');

// @desc  Get all products (with optional search & category filter)
// @route GET /api/products
const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (category && category !== 'All') {
      query.category = category;
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get single product
// @route GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      'createdBy',
      'name'
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Create product (admin)
// @route POST /api/products
const createProduct = async (req, res) => {
  try {
    const { name, price, category, image, description } = req.body;

    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ message: 'Name, price, and category are required' });
    }

    const product = await Product.create({
      name,
      price,
      category,
      image,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update product (admin)
// @route PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { name, price, category, image, description } = req.body;
    if (name) product.name = name;
    if (price !== undefined) product.price = price;
    if (category) product.category = category;
    if (image) product.image = image;
    if (description !== undefined) product.description = description;

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Delete product (admin)
// @route DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const productId = new mongoose.Types.ObjectId(req.params.id);

    const deleted = await Product.findByIdAndDelete(productId);

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const result = await Cart.updateMany(
      { "items.productId": productId },
      { $pull: { items: { productId: productId } } }
    );

    console.log("Cart cleanup result:", result);

    res.json({ message: 'Product removed and cleaned from carts' });

  } catch (error) {
    console.error("DELETE ERROR:", error);  
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
