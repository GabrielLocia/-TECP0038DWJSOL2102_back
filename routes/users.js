const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const permission = require('../middlewares/permission')

// Get all users
router.get('/', async (req, res) => {
    const users = await sequelize.models.users.findAndCountAll();
    return res.status(200).json({ data: users });
});


router.delete('/:id', permission('admin'), async (req, res) => {
    const { params: { id } } = req;
    const users = await sequelize.models.users.findByPk(id);
    if (!users) {
      return res.status(404).json({ code: 404, message: 'user not found' });
    }
    await users.destroy();
    return res.json();
  });

module.exports = router;