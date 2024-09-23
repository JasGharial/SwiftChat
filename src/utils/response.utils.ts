import { Response } from "express";

/**
 * Send a success response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message (optional)
 * @param {Object} data - Data to be sent in the response (optional)
 */
export const successResponse = (res: Response, statusCode = 200, message = "", data = {}) => {
  res.status(statusCode).json({
    data,
    message,
    status: statusCode,
    success: true
  });
};

/**
 * Send an error response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message (optional)
 */
export const errorResponse = (res: Response, statusCode = 500, message = "Server Error") => {
  res.status(statusCode).json({
    data: {},
    message,
    status: statusCode,
    success: false
  });
};