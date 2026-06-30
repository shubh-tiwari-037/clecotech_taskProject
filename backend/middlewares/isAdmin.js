const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized Request",
    });
  }

  if (req.user.role !== "Admin") {
    return res.status(403).json({
      message: "Access Denied. Admin only.",
    });
  }

  next();
};

export default isAdmin;