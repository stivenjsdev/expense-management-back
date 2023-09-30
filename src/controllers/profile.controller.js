import { Expense } from "../models/expense.model.js";
import { Product } from "../models/product.model.js";
import { Revenue } from "../models/revenue.model.js";
import { User } from "../models/user.model.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user;

    const foundUser = await User.findOne({ _id: userId }).exec();

    const user = { name: foundUser.name, email: foundUser.email };

    res.status(200).json({
      ok: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentValues = async (req, res, next) => {
  try {
    const userId = req.user;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const foundRevenues = await Revenue.find({ userId, year, month });
    const totalRevenues = foundRevenues.reduce(
      (total, value) => total + value.value,
      0
    );

    const foundExpenses = await Expense.find({}).populate("productId");
    const totalExpenses = foundExpenses.reduce(
      (total, value) => total + value.productId.price,
      0
    );

    const values = {
      totalRevenues,
      totalExpenses,
    };

    res.status(200).json({
      ok: true,
      values,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const userId = req.user;
    const { name, price } = req.body;

    const newProduct = new Product({ name, price, userId });
    await newProduct.save();

    res.status(201).json({ ok: true, newProduct });
    // res.status(201).end();
  } catch (error) {
    next(error);
  }
};

export const createExpense = async (req, res, next) => {
  try {
    const userId = req.user;
    const { note, year, month, day, monthName, dayName, productId } = req.body;

    const newExpense = new Expense({
      note,
      year,
      month,
      day,
      monthName,
      dayName,
      userId,
      productId,
    });

    await newExpense.save();
    res.status(201).json({ ok: true, newExpense });
  } catch (error) {
    next(error);
  }
};

export const createRevenue = async (req, res, next) => {
  try {
    const userId = req.user;
    const { description, value, year, month, day, monthName, dayName } = req.body;

    const newRevenue = new Revenue({
      description,
      value,
      year,
      month,
      day,
      monthName,
      dayName,
      userId,
    });

    await newRevenue.save();
    res.status(201).json({ ok: true, newRevenue });
  } catch (error) {
    next(error);
  }
}
