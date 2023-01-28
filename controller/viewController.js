const imagekit = require("../config/imagekit");
const { Cars } = require("../models");
const { Op } = require("sequelize");
// get atau retrieve function controller

const viewCar = async (req, res) => {
  try {
    if (req.query.search) {
      const viewCars = await Cars.findAll({
        where: {
          nama: {
            [Op.or]: {
              [Op.iLike]: req.query.search,
              [Op.substring]: req.query.search,
            },
          },
        },
      });
      res.status(200).render("index", { layout: "parsials/layout", title: "Rental Mobil", viewCars, msg: req.flash("msg"), msgU: req.flash("msgU"), msgE: req.flash("msgE"), msgD: req.flash("msgD") });
    } else if (req.query.size) {
      if (req.query.size == "All") {
        const viewCars = await Cars.findAll();
        res.status(200).render("index", { layout: "parsials/layout", title: "Rental Mobil", viewCars, msg: req.flash("msg"), msgU: req.flash("msgU"), msgE: req.flash("msgE"), msgD: req.flash("msgD") });
      }
      const viewCars = await Cars.findAll({
        where: {
          ukuran: req.query.size,
        },
      });
      res.status(200).render("index", { layout: "parsials/layout", title: "Rental Mobil", viewCars, msg: req.flash("msg"), msgU: req.flash("msgU"), msgE: req.flash("msgE"), msgD: req.flash("msgD") });
    } else {
      const viewCars = await Cars.findAll();
      res.status(200).render("index", { layout: "parsials/layout", title: "Rental Mobil", viewCars, msg: req.flash("msg"), msgU: req.flash("msgU"), msgE: req.flash("msgE"), msgD: req.flash("msgD") });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
const pageCreateCar = (req, res) => {
  res.render("tambahProduct", { layout: "parsials/layout", title: "Tambah Mobil" });
};
const pageUpdateCar = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Cars.findByPk(id);
    res.render("pageUpdateCar", { layout: "parsials/layout", car, title: "Ubah Mobil" });
  } catch (err) {
    console.log(err);
  }
};
// create new data
const saveCar = async (req, res) => {
  try {
    // process file naming
    const split = req.file.originalname.split(".");
    const extension = split[split.length - 1];

    const imageName = req.file.originalname + "." + extension;
    // upload file
    const img = await imagekit.upload({
      file: req.file.buffer,
      fileName: imageName,
    });
    console.log(req.body);
    const { nama, ukuran, harga } = req.body;
    await Cars.create({
      nama,
      ukuran,
      harga,
      foto: img.url,
    });

    req.flash("msg", "Data Berhasil Disimpan");
    res.redirect("/");
  } catch (err) {
    req.flash("msgE", "Data Gagal Disimpan");
    res.redirect("/");
  }
};

// get atau retrieve function controller
const viewCarById = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Cars.findByPk(id);
    res.render("detailCar", { layout: "parsials/layouts", title: "detail Mobil", car });
  } catch (err) {
    req.flash("msgE", "Data Gagal Ditampilkan");
    res.redirect("/");
  }
};

// update data
const updateCarView = async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  try {
    if (req.file != undefined) {
      // process file naming
      const split = req.file.originalname.split(".");
      const extension = split[split.length - 1];

      const imageName = req.file.originalname + "." + extension;
      // upload file
      console.log(req.file);
      const img = await imagekit.upload({
        file: req.file.buffer,
        fileName: imageName,
      });
      const { id, nama, ukuran, harga } = req.body;
      console.log(req.body);
      await Cars.update(
        {
          nama,
          harga,
          ukuran,
          foto: img.url,
        },
        {
          where: {
            id,
          },
        }
      );

      req.flash("msgU", "Data Berhasil Diubah");
      res.redirect("/");
    } else {
      const { id, nama, ukuran, harga } = req.body;
      console.log(req.body);
      await Cars.update(
        {
          nama,
          harga,
          ukuran,
        },
        {
          where: {
            id,
          },
        }
      );

      req.flash("msgU", "Data Berhasil Diubah");
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    req.flash("msgE", "Data Gagal Diubah");
    res.redirect("/");
  }
};

// delete data
const destroyCar = async (req, res) => {
  try {
    const id = req.body.id;
    await Cars.destroy({
      where: {
        id,
      },
    });
    req.flash("msgD", "Data Berhasil Dihapus");
    res.redirect("/");
  } catch (err) {
    req.flash("msgE", "Data Gagal Dihapus");
    res.redirect("/");
  }
};

module.exports = {
  viewCar,
  pageCreateCar,
  pageUpdateCar,
  saveCar,
  viewCarById,
  updateCarView,
  destroyCar,
};
