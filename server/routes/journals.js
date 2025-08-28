// File: server/routes/journals.js
const express = require('express');
const {
  getJournals,
  getJournal,
  createJournal,
  updateJournal,
  deleteJournal,
  getJournalStats
} = require('../controllers/journalController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getJournals)
  .post(createJournal);

router.route('/:id')
  .get(getJournal)
  .put(updateJournal)
  .delete(deleteJournal);

router.get('/stats/overview', getJournalStats);

module.exports = router;