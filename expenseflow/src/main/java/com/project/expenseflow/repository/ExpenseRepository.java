package com.project.expenseflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.expenseflow.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}