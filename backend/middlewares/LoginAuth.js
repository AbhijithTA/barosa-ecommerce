const auth = () => {
  return (req, res, next) => {
    try {
      const token = req.cookies["token"];
      if (!token) {
        return res.status(401).json({ error: "Token is required" });
      }

      const user = jwt.verify(token, process.env.AUTH_SECRET_KEY);
      req.user = user;
      next();
    } catch (err) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
      });
      return res.redirect("/login");
    }
    //respond with an error
    return res.status(401).json({ error: "Invalid or Expired access token" });

    // so in the front end when this error hits redirect to /users/refresh
  };
};
