import express from 'express'
import dataCheckMiddleware from '../midleware/dataCheckmidleware.js'

const router = express.Router()

import { 
   getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    ticketResolve   } from '../controller.js/ticketController.js'

router.get('/', getAllTickets)
router.get('/:id', getTicketById)
router.post('/', dataCheckMiddleware, createTicket),
router.put('/:id', dataCheckMiddleware, updateTicket)
router.delete('/:id', deleteTicket)
router.patch('/:id/resolve', ticketResolve)

export default router