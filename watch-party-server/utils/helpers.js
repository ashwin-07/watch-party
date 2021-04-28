
const ActionResult = require('../model/ActionResult')

const createFailedAction = (message) => {
    return new ActionResult(false, message)
}

const createSuccessAction = (message, data = {}) => {
    return new ActionResult(true, message, data);
} 

module.exports = { createFailedAction, createSuccessAction};