import React from "react";
import Navbar from "./Navbar";
import CreateExpense from "./CreateExpense";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setMarkAsDone } from "@/redux/expenseSlice";
import ExpenseTable from "./ExpenseTable";
import useGetExpenses from "@/hooks/useGetExpense";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Home = () => {
  useGetExpenses();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const changeCategoryHandler = (value) => {
    dispatch(setCategory(value));
  };
  const changeDoneHandler = (value) => {
    dispatch(setMarkAsDone(value));
  };

  return (
    <div className="max-lg:p-2">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-6">
        {!user && (
          <div className="mb-4 text-center space-y-4">
            <h1 className="text-4xl font-bold text-primary mb-1">
              🚀 Welcome to KexpTracker!
            </h1>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <p className="text-lg text-gray-700 mb-8">
                Your friendly neighborhood expense tracker that makes managing
                money feel like a game! 🎮
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2 text-left p-4 bg-white rounded-lg shadow-sm">
                  <h2 className="text-2xl font-semibold mb-4">✨ Features</h2>
                  <ul className="pl-6 space-y-3">
                    <li>🏷️ Categorize your expenses with labels</li>
                    <li>✅ Mark expenses as done/undone like a todo list</li>
                    <li>📊 Real-time spending insights</li>
                    <li>🔒 Fully secured financial data</li>
                  </ul>
                </div>

                <div className="space-y-2 text-left p-4 bg-white rounded-lg shadow-sm">
                  <h2 className="text-2xl font-semibold mb-4">
                    🎮 How to use KexpTracker
                  </h2>
                  <ol className="list-decimal pl-12 space-y-3">
                    <li>Sign up (it's free forever!)</li>
                    <li>Add your first expense</li>
                    <li>Mark completed expenses as "done"</li>
                    <li>Watch your spending habits transform! 💸→💰</li>
                  </ol>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-lg font-medium">
                  Ready to level up your finance game?
                </p>
                <div className="flex gap-4 justify-center mt-4">
                  <Link to="/signup">
                    <Button size="lg">Start Tracking</Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg">
                      Existing User Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {user && (
          <>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-lg">
                Welcome back, {user.fullname} 👋
              </h2>
              <CreateExpense />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <h1 className="font-medium text-lg">Filter By: </h1>
              <Select onValueChange={changeCategoryHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="bills">Bills</SelectItem>
                    <SelectItem value="emi">EMI</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select onValueChange={changeDoneHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Marked as" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="done">Done</SelectItem>
                    <SelectItem value="undone">Undone</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <ExpenseTable />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
