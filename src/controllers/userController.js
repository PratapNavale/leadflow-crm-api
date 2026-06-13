const prisma = require("../prisma/prismaClient");

const getProfile = async (req, res) => {

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

module.exports = {
    getProfile
};