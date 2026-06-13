const prisma = require("../prisma/prismaClient");

const getDashboardStats = async (req, res) => {
  try {

    const totalLeads = await prisma.lead.count();

    const newLeads = await prisma.lead.count({
      where: {
        status: "NEW"
      }
    });

    const contactedLeads = await prisma.lead.count({
      where: {
        status: "CONTACTED"
      }
    });

    const qualifiedLeads = await prisma.lead.count({
      where: {
        status: "QUALIFIED"
      }
    });

    const convertedLeads = await prisma.lead.count({
      where: {
        status: "CONVERTED"
      }
    });

    const lostLeads = await prisma.lead.count({
      where: {
        status: "LOST"
      }
    });

    res.status(200).json({
      totalLeads,
      newLeads,
      contactedLeads,
      qualifiedLeads,
      convertedLeads,
      lostLeads
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

module.exports = {
  getDashboardStats
};