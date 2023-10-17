const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err.title == "paramsError") {
    res.status(400).json({ message: "need title and genres params" });
  } else if (err.title == "notFound") {
    res.status(404).json({ message: "movies not found" });
  } else {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = errorHandler;
