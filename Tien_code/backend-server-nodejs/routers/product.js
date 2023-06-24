const { Router } = require("express");
const paginate = require("../services/paginate.service");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Product = require("../models/product");
const md = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);
const router = new Router();

const serializer = (product) => {
  return product.toObject({ versionKey: false });
};

router.get("/", async (req, res) => {
  try {
    const products = await paginate(Product.find({}), req);
    res.send(products.map(serializer));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Tao API cho san pham

router.get("/", async (req, res) => {
  Product.find()
    .populacate("author")
    .then((products) => {
      res.send(products);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      throw new Error("product not found");
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const post = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      brand: req.body.brand,
      availability: req.body.availability,
      rating: req.body.rating,
      author_id: req.body.author_id,
      // Thêm các trường dữ liệu khác tương ứng với model
    });
    post.slug = slugify(post.name || "", { lower: true, strict: true });

    post.image_url = result.secure_url;
    post.cloudinary_id = result.public_id;
    post.name_image = req.file.name_image;
    const savedPost = await post.save(); // Lưu bài viết vào database
    res
      .status(201)
      .json({ success: true, message: "Thanh Cong ", post: savedPost }); // Trả về kết quả sau khi lưu bài đăng
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Có lỗi xảy ra khi đăng sản phẩm" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Product.findById(req.params.id).populate("author");

    if (post) {
      res.send(post);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category, brand, availability, rating } =
      req.body;
    let post = await Product.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Product not found");
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      post.cloudinary_id = result.public_id;
      post.image_url = result.secure_url;
      post.name_image = req.file.originalname;
    }
    post.description = description;
    post.price = price;
    post.category = category;
    post.brand = brand;
    post.availability = availability;
    post.rating = rating;
    if (name) {
      post.name = name;
      post.slug = slugify(name, { lower: true, strict: true });
    }

    const validationError = post.validateSync();
    if (validationError) {
      throw validationError;
    }

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((post) => {
      if (post) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
