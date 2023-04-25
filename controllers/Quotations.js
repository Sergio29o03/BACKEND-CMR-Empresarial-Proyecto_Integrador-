import Quotations from "../models/Quotationsmodel.js"

export const getAllQuotations = async (req, res, next) => {

    try {
        const result = await Quotations.query(
            `SELECT 
            quotations.qu_ident, 
            TO_CHAR(quotations.qu_created, 'DD-MM-YYYY'),
            quotations.qu_value,
            users.name, 
            clients.name,
            clients.nit,
            clients.email
            FROM 
            quotations 
            LEFT JOIN users 
            ON quotations.user_id = users.user_id 
            LEFT JOIN clients 
            ON quotations.client_id = clients.client_id
            `
        )
        res.json(result.rows)
    } catch (error) {
        next(error)
    }
}

export const createQuotation = async (req, res, next) => {

    const { qu_ident, user_id, client_id } = req.body;

    try {

        const result = await Quotations.query(
            `INSERT INTO quotations (qu_ident, user_id, client_id) VALUES ($1, $2, $3)`
            , [qu_ident, user_id, client_id]
        )

        res.json(result.rows)

    } catch (error) {
        next(error)
    }
}

export const createFinalQuotation = async (req, res, next) => {

    const { qu_value, qu_ident } = req.body;

    try {

        const result = await Quotations.query(
            `UPDATE quotations SET qu_value = $1 WHERE qu_ident = $2`
            , [qu_value, qu_ident]
        );

        return res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
}


export const getIdentQuotation = async (req, res, next) => {

    try {
        const result = await Quotations.query(
            `SELECT CAST (qu_ident AS integer) FROM quotations
            ORDER BY qu_ident DESC limit 1`
        )

        return res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
}

export const getQuotationValueForDay = async (req, res, next) => {

    const { qu_created } = req.body;


    try {
        const result = await Quotations.query('SELECT SUM(qu_value) FROM quotations WHERE qu_created = $1', [qu_created]
        )

        res.json(result.rows)


    } catch (error) {
        next(error)
    }
}

export const getQuotationForEdit = async (req, res, next) => {

    const { qu_ident } = req.body;

    try {
        const result = await Quotations.query(`
        SELECT 	
            quotations.client_id,
            clients.name,
            clients.nit,
            clients.email,
            clients.number,
            requested_products.quantity,
            requested_products.product_id,
            products.name,
            products.price,
            products.description
        FROM quotations 
        LEFT JOIN clients 
            ON quotations.client_id = clients.client_id
        LEFT JOIN quotations 
            ON   quotations.qu_ident = requested_products.qu_ident
        LEFT JOIN products
            ON requested_products.product_id = products.product_id
        WHERE quotations.qu_ident = $1`, [qu_ident]
        )

        res.json(result.rows)

    } catch (error) {
        next(error)
    }
}