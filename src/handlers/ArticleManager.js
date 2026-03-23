import ArticleProvider from '../data-access/ArticleProvider.js';
import { validationResult } from 'express-validator';

const ArticleManager = {
  async registerEntry(req, res) {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        status: 'fail',
        errors: validationErrors.array()
      });
    }

    try {
      const result = await ArticleProvider.addEntry(req.body);
      res.status(201).json({
        status: 'success',
        message: 'New blog entry recorded',
        payload: result
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to record entry',
        details: err.message
      });
    }
  },

  async listAll(req, res) {
    const searchFilters = {
      topic: req.query.topic,
      contributor: req.query.contributor,
      publishDate: req.query.publishDate
    };

    try {
      const entries = await ArticleProvider.fetchAll(searchFilters);
      res.status(200).json({
        status: 'success',
        total: entries.length,
        payload: entries
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Could not retrieve entries',
        details: err.message
      });
    }
  },

  async getOne(req, res) {
    const { id } = req.params;

    try {
      const entry = await ArticleProvider.findByPk(id);
      if (!entry) {
        return res.status(404).json({
          status: 'fail',
          message: 'Entry not found'
        });
      }
      res.status(200).json({
        status: 'success',
        payload: entry
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Error fetching entry',
        details: err.message
      });
    }
  },

  async updateExisting(req, res) {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        status: 'fail',
        errors: validationErrors.array()
      });
    }

    const { id } = req.params;

    try {
      const updated = await ArticleProvider.modify(id, req.body);
      if (!updated) {
        return res.status(404).json({
          status: 'fail',
          message: 'Entry not found for update'
        });
      }
      res.status(200).json({
        status: 'success',
        message: 'Entry successfully updated',
        payload: updated
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Update operation failed',
        details: err.message
      });
    }
  },

  async removeEntry(req, res) {
    const { id } = req.params;

    try {
      const result = await ArticleProvider.remove(id);
      if (!result) {
        return res.status(404).json({
          status: 'fail',
          message: 'Entry not found for deletion'
        });
      }
      res.status(200).json({
        status: 'success',
        message: 'Entry removed',
        payload: result
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Deletion failed',
        details: err.message
      });
    }
  },

  async findByKeywords(req, res) {
    const { term } = req.query;

    if (!term) {
      return res.status(400).json({
        status: 'fail',
        message: 'Search term is missing'
      });
    }

    try {
      const matches = await ArticleProvider.lookup(term);
      res.status(200).json({
        status: 'success',
        total: matches.length,
        payload: matches
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Search execution failed',
        details: err.message
      });
    }
  }
};

export default ArticleManager;
