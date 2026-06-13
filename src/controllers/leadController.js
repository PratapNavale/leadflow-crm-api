const prisma = require("../prisma/prismaClient");

// CREATE LEAD
const createLead = async (req, res) => {
  try {
    const { name, email, phone, company } = req.body;

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        company,
        assignedTo: req.user.id
      }
    });

    res.status(201).json({
      message: "Lead created successfully",
      lead
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

// GET ALL LEADS
const getAllLeads = async (req, res) => {
  try {

    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    res.status(200).json(leads);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

// GET SINGLE LEAD
const getLeadById = async (req, res) => {
  try {

    const id = parseInt(req.params.id);

    const lead = await prisma.lead.findUnique({
      where: { id }
    });

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found"
      });
    }

    res.status(200).json(lead);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

// UPDATE LEAD
const updateLead = async (req, res) => {
  try {

    const id = parseInt(req.params.id);

    const { name, email, phone, company, status } = req.body;

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        company,
        status
      }
    });

    res.status(200).json({
      message: "Lead updated successfully",
      updatedLead
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

// DELETE LEAD
const deleteLead = async (req, res) => {
  try {

    const id = parseInt(req.params.id);

    await prisma.lead.delete({
      where: { id }
    });

    res.status(200).json({
      message: "Lead deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead
};