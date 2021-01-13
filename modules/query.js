module.exports = {
    readTravel: (comparison) => {
        return `
            SELECT t.*, ifnull(sum(j.sum_expense), 0) sum_budget, ifnull(sum(j.sum_expense), 0) sum_expense
            FROM travels t
            LEFT JOIN 
                (	SELECT p.id, p.travel_id,
                    (	SELECT sum(b.price_krw)
                        FROM budgets b
                        WHERE b.plan_id = p.id ) sum_budget,
                    (	SELECT sum(e.price_krw)
                        FROM expenses e
                        WHERE e.plan_id = p.id ) sum_expense
                    FROM plans p 
                ) AS j
            ON j.travel_id = t.id
            WHERE t.user_id = :userId AND t.start_date ${comparison} :date
            GROUP BY t.id`
    },

    readPlan: () => {
        return ` 
            SELECT p.*, ifnull(sum(j.sum_expense), 0) sum_budget, ifnull(sum(j.sum_expense), 0) sum_expense
            FROM plans p
            LEFT JOIN
                ( 
                    SELECT p.id,
                    (   SELECT sum(b.price_krw)
                        FROM budgets b
                        WHERE b.plan_id = p.id) sum_budget,     
                    (   SELECT sum(e.price_krw)
                        FROM expenses e
                        WHERE e.plan_id = p.id ) sum_expense
                    FROM plans p
                ) AS j
            WHERE p.travel_id = :travelId
            GROUP BY p.id
            
        `
    }
}
