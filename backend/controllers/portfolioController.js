const Portfolio = require("../models/portfolio");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

exports.newPortfolio = async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    let imageDataUri = images[i];
    // console.log(imageDataUri)
    try {
      const result = await cloudinary.v2.uploader.upload(`${imageDataUri}`, {
        folder: "portfolio",
        width: 150,
        crop: "scale",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } catch (error) {
      console.log(error);
    }
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const portfolios = await Portfolio.create(req.body);
  if (!portfolios)
    return res.status(400).json({
      success: false,
      message: "Project not created",
    });

  res.status(201).json({
    success: true,
    portfolios,
  });
};
exports.getPortfolio = async (req, res, next) => {
  console.log(req.query);

  const { page } = req.query;
  // try {
  //   const portfolios = await Portfolio.find({});

  //   res.status(200).json({
  //     success: true,
  //     count: portfolios.length,
  //     portfolios,
  //   });
  // } catch (error) {

  const portfolios = await Portfolio.find({}).limit(page);

  res.status(200).json({
    success: true,
    count: portfolios.length,
    portfolios,
  });

  // console.error("Error fetching data:", error);
  // res.status(500).json({
  //   success: false,
  //   message: "Internal Server Error",
  // });
};

exports.getAdminProject = async (req, res, next) => {
  const portfolios = await Portfolio.find({});
  res.status(200).json({
    success: true,
    count: portfolios.length,
    portfolios,
  });
};
// };
// exports.getPortfolio = async (req, res, next) => {
//   const portfolios = await Portfolio.find({});
//   res.status(200).json({
//     success: true,
//     count: portfolios.length,
//     portfolios,
//   });
// };

exports.updatePortfolio = async (req, res, next) => {
  console.log(req.body);
  let portfolios = await Portfolio.findById(req.params.id);

  console.log(portfolios);
  if (!portfolios) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }
  let images = req.body.images;

  if (typeof req.body.images === "string") {
    req.body.images = [];
    req.body.images.push(images);
    images = req.body.images;
  }
  if (images !== undefined) {
    // Deleting images associated with the member
    for (let i = 0; i < portfolios.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        portfolios.images[i].public_id
      );
    }

    let imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "portfolio",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }
  portfolios = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });
  //   if (!portfolios) {
  //   return res.status(404).json({
  //     success: false,
  //     message: "project not updated",
  //   });
  // }
  return res.status(200).json({
    success: true,
    portfolios,
  });
};

// exports.updatePortfolio = async (req, res, next) => {
//   let portfolios = await Portfolio.findById(req.params.id);
//   console.log(portfolios);
//   if (!portfolios) {
//     return res.status(404).json({
//       succdess: false,
//       portfolios,
//       message: "Project not found",
//     });
//   }
//   let images = req.body.images;
//   if (images !== undefined) {
//     for (let i = 0; i < portfolios.images.length; i++) {
//       const result = await cloudinary.v2.uploader.destroy(
//         portfolios.images[i].public_id
//       );
//     }

//     let imagesLinks = [];
//     for (let i = 0; i < images.length; i++) {
//       const result = await cloudinary.v2.uploader.upload(images[i], {
//         folder: "portfolio",
//       });
//       imagesLinks.push({
//         public_id: result.public_id,
//         url: result.secure_url,
//       });
//     }

//     req.body.images = imagesLinks;
//   }

//   portfolios = await portfolios.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//     useFindandModify: false,
//   });

//   return res.status(200).json({
//     success: true,
//     portfolios,
//   });
// };
exports.deletePortfolio = async (req, res, next) => {
  const portfolios = await Portfolio.findByIdAndDelete(req.params.id);
  if (!portfolios) {
    return res.status(404).json({
      portfolios,
      success: false,
      message: "Service not found",
    });
  }
  // await product.remove();
  // res.status(200).json({
  //   success: true,
  //   message: "Service deleted",
  // });
};
exports.getSinglePortfolio = async (req, res, next) => {
  const portfolios = await Portfolio.findById(req.params.id);
  if (!portfolios) {
    return res.status(404).json({
      success: false,
      message: "Service not found",
    });
  }
  res.status(200).json({
    success: true,
    portfolios,
  });
};

// exports.getAdminProject = async (req, res, next) => {
//   const portfolios = await Portfolio.find({});
//   res.status(200).json({
//     success: true,
//     count: portfolios.length,
//     portfolios,
//   });
// };
