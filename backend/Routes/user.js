const router = require("express").Router();
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const User = require("../model/userSchema");
const { uploadController } = require("../controller/uploadController");

// router.post("/:id", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const userProfileExists = await User.findById(req.params.id)
    
//     if(userProfileExists.profileImage.url){
//         return res.status(400).json({message:"user profile image already exists"})
//     }

//     const result = await cloudinary.uploader.upload(req.file.path);
    
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         profileImage: {
//           url: result.secure_url,
//           public_id: result.public_id,
//         },
//       },
//       { new: true }
//     );

//     res.status(200).json({ message: "Image uploaded successfully!", user });
//   } catch (e) {
//     return res
//       .status(500)
//       .json({ message: "failed to upload image", error: e.message });
//   }
// });

router.post("/", upload.single("file"), uploadController);

module.exports = router;
