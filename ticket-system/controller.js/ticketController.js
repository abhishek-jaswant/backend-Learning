


import { readtickets, writeToFile } from '../models/ticketModel.js';


const getAllTickets = (req, res) => { 
    
    res.status(200).json({ data: readtickets.tickets })
}


const getTicketById = (req, res) => {
    const { id } = req.params
    const ticket = readtickets.tickets.find(ticket => ticket.id === Number(id))

    if (!ticket) {
        return res.status(404).json({ error: "Ticket not found please check the id" })
    }

    res.status(200).json({
        msg: "Ticket found",
        data: ticket
    })
}

const createTicket = (req, res) => {
    const { title, description, priority, user } = req.body

    const ticket = {
        id: readtickets.tickets.length + 1,
        title,
        description,
        priority,
        user,
        status: "pending"
    }

    readtickets.tickets.push(ticket)
    writeToFile(readtickets)

    res.status(201).json({
        msg: "Ticket created successfully",
        data: ticket
    })
}


const updateTicket = (req, res) => {
    const { id } = req.params;
    const { title, description, priority, user, status } = req.body;

    const ticket = readtickets.tickets.find(
        ticket => ticket.id === Number(id)
    );

    if (!ticket) {
        return res.status(404).json({
            error: "Ticket not found"
        });
    }

    if (
        title === undefined &&
        description === undefined &&
        priority === undefined &&
        user === undefined &&
        status === undefined
    ) {
        return res.status(400).json({
            error: "Provide at least one field to update"
        });
    }

    if (title !== undefined) {
        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({ error: "Invalid title" });
        }
        ticket.title = title.trim();
    }

    if (description !== undefined) {
        if (typeof description !== "string" || !description.trim()) {
            return res.status(400).json({ error: "Invalid description" });
        }
        ticket.description = description.trim();
    }

    if (priority !== undefined) {
        if (typeof priority !== "string" || !priority.trim()) {
            return res.status(400).json({ error: "Invalid priority" });
        }
        ticket.priority = priority.trim();
    }

    if (user !== undefined) {
        if (typeof user !== "string" || !user.trim()) {
            return res.status(400).json({ error: "Invalid user" });
        }
        ticket.user = user.trim();
    }

    if (status !== undefined) {
        if (typeof status !== "string" || !status.trim()) {
            return res.status(400).json({ error: "Invalid status" });
        }
        ticket.status = status.trim();
    }

    writeToFile(readtickets);

    return res.status(200).json({
        msg: "Ticket updated successfully",
        data: ticket
    });
};

   

const deleteTicket = (req, res) => {
    const { id } = req.params
    const ticket = readtickets.tickets.find(ticket => ticket.id === Number(id))

    if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" })
    }

    readtickets.tickets = readtickets.tickets.filter(ticket => ticket.id !== Number(id))
    writeToFile(readtickets)

    res.status(200).json({
        msg: "Ticket deleted successfully"
    })
}


const ticketResolve = (req, res) => {
    const { id } = req.params
    const ticket = readtickets.tickets.find(ticket => ticket.id === Number(id))

    if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" })
    }

    ticket.status = "resolved"
    writeToFile(readtickets)

    res.status(200).json({
        msg: "Ticket resolved successfully",
        data: ticket
    })  
}

export  {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    ticketResolve    
}   