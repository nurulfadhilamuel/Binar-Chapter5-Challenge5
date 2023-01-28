const imagekit = require("../config/imagekit");
const { Cars } = require("../models");

// get atau retrieve function controller
async function getCasrs(req, res) {
  try {
    const responseData = await Cars.findAll();
    res.status(200).json({
      data: responseData,
    });
  } catch (err) {
    console.log(err.message);
  }
}

// create new data
async function createCar(req, res) {
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
    const { nama, ukuran, harga } = req.body;
    const newProduct = await Cars.create({
      nama,
      ukuran,
      harga,
      foto: img.url,
    });

    res.status(200).json({
      status: "success",
      data: newProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
}

// get atau retrieve function controller
async function getCarById(req, res) {
  try {
    const id = req.params.id;
    const car = await Cars.findByPk(id);
    if (car === null) {
      res.status(404).json({
        message: `data pada id ${id} tidak ada`,
      });
    }

    res.status(200).json({
      data: product,
    });
  } catch (err) {
    console.log(err.message);
  }
}

// update data
async function updateCar(req, res) {
  try {
    const split = req.file.originalname.split(".");
    const extension = split[split.length - 1];

    const imageName = req.file.originalname + "." + extension;

    const img = await imagekit.upload({
      file: req.file.buffer,
      fileName: imageName,
    });
    const { nama, ukuran, harga } = req.body;
    const id = req.params.id;
    await Cars.update(
      {
        nama,
        ukuran,
        harga,
        foto: img.url,
      },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err.message);
  }
}

// delete data
async function deleteCar(req, res) {
  try {
    const id = req.params.id;
    await Cars.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "success delete produk",
    });
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  getCasrs,
  createCar,
  getCarById,
  updateCar,
  deleteCar,
};
