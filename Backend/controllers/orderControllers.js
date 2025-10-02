const Order = require("../models/Order");
const User = require("../models/User");

exports.createOrder = async (req, res) => {
  try {
    const { status, user: userId } = req.body;

    // 1️⃣ Get the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Create the new order
    const newOrder = new Order({
      status: status || "pending",
      user: userId,
    });

    const savedOrder = await newOrder.save();

    // 3️⃣ Link the order to the user using $push
    await User.findByIdAndUpdate(userId, {
      $push: {
        orders: savedOrder._id,
      },
    });

    // 4️⃣ Success response
    return res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
exports.getOrders = async (req, res) => {
  try {
    // Fetch all orders and populate the user field with name and email
    const orders = await Order.find().populate("user", "name email");

    // Return the actual orders data in the response
    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders, // sending orders with populated info
    });
  } catch (error) {
    console.error(error); // log the actual error for debugging
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};
exports.fetchOrderById = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the order by ID and populate user and products
    const order = await Order.findById(id).populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    console.error(error); // Log actual error for debugging
    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
};
exports.updateOrder = async (req, res) => {
  try {
    const id = req.params.id;

    // Update the order with request body and return the updated document
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("user", "name email");

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update order",
    });
  }
};
exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;

    // Delete the order by ID
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      data: deletedOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete order",
    });
  }
};
