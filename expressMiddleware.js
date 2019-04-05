module.exports = (controller) => async (req, res, next) => {
    const data = Object.assign({}, req.body, req.params, req.query);
    if (!data.type) return next();
    const r = controller[data.type];
    if (!r) return next();
    const handler = typeof r === "function" ? r : r.handler;
    if (!handler) return next();
    try {
        const payload = await handler(data, req, res, next);
        payload.type = payload.type || r.successType;
        return res.send(payload);
    } catch (error) {
        const type = error.type || r.errorType || "_INTERNAL_SERVER_ERROR"
        return next({ type, error })
    }
}
