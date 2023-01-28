const { Router } = require("express");
const multer = require("multer");
const router = Router();
const upload = multer();
const { getCasrs, createCar, getCarById, updateCar, deleteCar } = require("../controller/apiController");
const { viewCar, pageCreateCar, pageUpdateCar, saveCar, viewCarById, updateCarView, destroyCar } = require("../controller/viewController");

// route untuk Api
router.post("/api", upload.single("foto"), createCar);
router.get("/api/:id", getCarById);
router.put("/api/:id", upload.single("foto"), updateCar);
router.delete("/api/:id", deleteCar);
router.get("/api", getCasrs);
// route untuk merender ejs/ halaman
router.get("/", viewCar);
router.get("/tambah", pageCreateCar);
router.get("/:id", pageUpdateCar);
router.get("detai/:id", viewCarById);
router.post("/tambah", upload.single("foto"), saveCar);
router.delete("/hapus", destroyCar);
router.put("/update", upload.single("foto"), updateCarView);

module.exports = router;
