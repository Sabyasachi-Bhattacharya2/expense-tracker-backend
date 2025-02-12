import Expense from "../models/Expense.js";
import error from "jsonwebtoken/lib/JsonWebTokenError.js";
import user from "../models/User.js";

export const addExpense = async (req, res) => {
    try {

        const {amount, category, date} = req.body;
        await Expense.create({
            user: req.user.id,
            amount: amount,
            category: category,
            date: date || Date.now()
        });
        res.status(201).json({
            user: user,
            amount: amount,
            category: category
        })
    } catch (error) {
        res.status(400).json({message: `Error adding expense: ${error.message}`});
    }
}

export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({user: req.user.id}).sort({date: -1})
        res.json(expenses);
    } catch (error) {
        res.status(400).send({message: `Error getting expenses: ${error.message}`});
    }
};

export const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).send({message: `Could not find expense.`});
        }

        if(expense.user.toString() !== req.user.id) {
            return res.status(405).send({message: `Not authorized to delete expense.`});
        }
        await expense.deleteOne({_id: req.params.id});
        res.status(200).json({
            message: 'Expense deleted successfully.'
        });
    } catch (error) {
        res.status(400).send({message: `Error deleting expense: ${error.message}`});
    }
}