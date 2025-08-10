const errorHandler = (err, req, res, next) => {
  // Log to console for dev
  console.error(err.stack);

  // Check for specific error types
  if (err.name === 'ValidationError') {
    // Mongoose validation error
    return res.status(400).json({
      success: false,
      error: err.message,
    });
    
  }

  if (err.name === 'UnauthorizedError') {
    // JWT authentication error
    return res.status(401).json({
      success: false,
      error: 'Not authorized',
    });
  }

  // Default to 500 server error
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error',
  });
};

export default errorHandler;