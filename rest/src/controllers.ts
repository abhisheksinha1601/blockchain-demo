import bl = require('./business-logic');

export async function signup(req, res) {
    try {
        let result = await bl.signup(req.body);
        if (result) {
            return res.status(200).send({ error: false, message: 'success', result });
        }
        return res.status(200).send({ error: true, message: 'failure', result: null });
    } catch (e) {
        res.status(200).send({ error: true, message: 'failure', result: null });
    }
}

export async function login(req, res) {
    try {
        let token = await bl.login(req.query.username, req.query.password);
        if (!token) {
            return res.status(200).send({ error: true, message: 'Wrong credentials', result: null });
        }
        return res.status(200).send({ error: false, message: 'Login successful', result: token });
    } catch (e) {
        res.status(200).send({ error: true, message: 'Wrong credentials', result: null });
    }
}

export async function addTransaction(req, res) {
    try {
        let result = await bl.addTransaction(req.user._id, req.body);
        if (result) {
            return res.status(200).send({ error: false, message: 'success', result });
        }
        return res.status(200).send({ error: true, message: 'failure', result: null });
    } catch (e) {
        res.status(200).send({ error: true, message: 'failure', result: null });
    }
}

export async function getTransactions(req, res) {
    try {
        let result = await bl.getAllTransactions(req.user._id);
        if (result) {
            return res.status(200).send({ error: false, message: 'success', result: result.slice(0, result.length - 1) });
        }
        return res.status(200).send({ error: true, message: 'failure', result: [] });
    } catch (e) {
        res.status(200).send({ error: true, message: 'failure', result: [] });
    }
}