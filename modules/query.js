module.exports = {
    readTravel: (comparison) => {
        return `
            SELECT t.*, ifnull(sum(j.sumBudget), 0) sumBudget, ifnull(sum(j.sumExpense), 0) sumExpense
            FROM Travels t
            LEFT JOIN 
                (	SELECT p.id, p.TravelId,
                    (	SELECT sum(b.priceKrw)
                        FROM Budgets b
                        WHERE b.PlanId = p.id ) sumBudget,
                    (	SELECT sum(e.priceKrw)
                        FROM Expenses e
                        WHERE e.PlanId = p.id ) sumExpense
                    FROM Plans p 
                ) AS j
            ON j.TravelId = t.id
            WHERE t.UserId = :UserId AND t.endDate ${comparison} :endDate
            GROUP BY t.id
            ORDER BY t.startDate`
    },

    readPlan: () => {
        return ` 
            SELECT p.*, ifnull(sum(j.sumBudget), 0) sumBudget, ifnull(sum(j.sumExpense), 0) sumExpense
            FROM Plans p
            LEFT JOIN
                (   SELECT p.id,
                    (   SELECT sum(b.priceKrw)
                        FROM Budgets b
                        WHERE b.PlanId = p.id) sumBudget,     
                    (   SELECT sum(e.priceKrw)
                        FROM Expenses e
                        WHERE e.PlanId = p.id ) sumExpense
                    FROM Plans p
                ) AS j
            ON j.id = p.id
            WHERE p.TravelId = :TravelId
            GROUP BY p.id`
    }
}
