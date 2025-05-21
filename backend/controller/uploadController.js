const uploadController = async (req, res) => {
    try {
      console.log("Body:", req.body);
      console.log("file:", req.file);
      if (!req.file) {
        return res.status(400).json({ message: "no file is uploaded" });
      }
      return res
        .status(200)
        .json({ message: "File uploaded", file: req.file.filename, path: req.file.path, name:req.body.name });
    } catch (err) {
      return res.status(400).json({ message: "failed to upload image" });
    }
  };
  
  module.exports = { uploadController };