import { body } from 'express-validator';

export const entryValidationRules = () => {
  return [
    body('headline')
      .trim()
      .notEmpty()
      .withMessage('The headline is required')
      .isLength({ min: 3, max: 200 })
      .withMessage('Headline must be between 3 and 200 characters'),

    body('body')
      .trim()
      .notEmpty()
      .withMessage('The body content is required')
      .isLength({ min: 10 })
      .withMessage('Body must be at least 10 characters long'),

    body('contributor')
      .trim()
      .notEmpty()
      .withMessage('Contributor name is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Contributor name must be between 2 and 100 characters'),

    body('publishDate')
      .notEmpty()
      .withMessage('Publish date is required')
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage('Date format must be YYYY-MM-DD'),

    body('topic')
      .trim()
      .notEmpty()
      .withMessage('Topic is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('Topic must be between 2 and 50 characters'),

    body('tags')
      .optional()
      .custom((value) => {
        if (Array.isArray(value)) {
          return value.every(tag => typeof tag === 'string' && tag.trim().length > 0);
        }
        if (typeof value === 'string') {
          return value.trim().length > 0;
        }
        return false;
      })
      .withMessage('Tags must be an array of strings or a non-empty string')
  ];
};

export const entryUpdateRules = () => {
  return [
    body('headline')
      .optional()
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('Headline must be between 3 and 200 characters'),

    body('body')
      .optional()
      .trim()
      .isLength({ min: 10 })
      .withMessage('Body must be at least 10 characters long'),

    body('contributor')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Contributor name must be between 2 and 100 characters'),

    body('publishDate')
      .optional()
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage('Date format must be YYYY-MM-DD'),

    body('topic')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Topic must be between 2 and 50 characters'),

    body('tags')
      .optional()
      .custom((value) => {
        if (Array.isArray(value)) {
          return value.every(tag => typeof tag === 'string' && tag.trim().length > 0);
        }
        if (typeof value === 'string') {
          return value.trim().length > 0;
        }
        return false;
      })
      .withMessage('Tags must be an array of strings or a non-empty string')
  ];
};
