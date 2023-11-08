import {describe, it, expect, jest } from 'bun:test';
import { SaveBudgetMonth } from './SaveBudgetMonth';
import { BudgetProviderInMemory } from '../../providers/Budget.provider.inMemory';
import { BudgetMonth } from './BudgetMonth';
import { BudgetYearId } from './BudgetYearId';
import { Month } from './Month';
import { Year } from './Year';
import { BudgetId } from './BudgetId';

describe('Save budget month', () => {
    it('should save a budget month', async () => {
        const budgetProvider = new BudgetProviderInMemory();
        budgetProvider.saveBudgetMonth = jest.fn();
        const saveBudgetMonth = new SaveBudgetMonth(budgetProvider);
        await saveBudgetMonth.from(
            new BudgetMonth({
            budgetMonthId: {
            budgetYearId: new BudgetYearId({
                budgetId: new BudgetId({
                userId: 'user-id',
                budgetId: 'budget-id'
                }),
                year: new Year(2023)
            
            }),
            month: new Month(1)
            },
            categoryBudgets: []
        }));
        expect(budgetProvider.saveBudgetMonth).toHaveBeenCalled();
    });
});