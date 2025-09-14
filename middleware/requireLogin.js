module.exports = (req, res, next) => {
  if (!req.body.id) {
    return res.status(401).json({ message: "You can't book the appointment." });
  }
  next();
}; 