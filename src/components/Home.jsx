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
import { useDispatch } from "react-redux";
import { setCategory, setMarkAsDone } from "@/redux/expenseSlice";
import ExpenseTable from "./ExpenseTable";
import useGetExpenses from "@/hooks/useGetExpense";

const Home = () => {
  useGetExpenses();
  const dispatch = useDispatch();
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
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-lg">Expense Tracker</h2>
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
      </div>
    </div>
  );
};

export default Home;
