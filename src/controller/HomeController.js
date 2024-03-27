const MainHome = (req, res) => {
  res.render("home");
};

const getHomeController = (req, res) => {
  res.send("Xin chao toi la Home Controller");
};

module.exports = { getHomeController, MainHome };
