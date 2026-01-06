// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
export const getMe = async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: req.user,
  });
};
