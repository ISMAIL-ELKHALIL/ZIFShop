const { ProductModel } = require("../models/productsModel");
const productController = {
  //? CREATE A NEW PRODUCT

  createProduct: async (req, res, next) => {
    try {
      const {
        sku,
        product_name,
        product_image,
        subcategory_id,
        short_description,
        long_description,
        price,
        discount_price,
        active,
      } = req.body;

      //? Upload the Product images to Cloudinary

      // const productImagePath = req.file ? req.file.path : null;
      const isProductExisted = await ProductModel.findOne({ sku: sku });

      if (isProductExisted) {
        return res.status(404).send("Product already exist");
      }
      const newProduct = await ProductModel.create({
        sku,
        product_name,
        product_image, //: productImagePath,
        subcategory_id,
        short_description,
        long_description,
        price,
        discount_price,
        active: true,
      });

      if (!newProduct) {
        res.status(404).send("Error creating new Product");
      }
      res.status(200).send(newProduct);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        where: "productController.createProduct",
        error: error.message,
      });
    }
  },

  //?GET ALL PRODUCTS

  getAllProducts: async (req, res) => {
    try {
      // Retrieve a list of Products, limiting to 10 orders per page
      const page = req.query.page || 1;
      const limit = 10;
      const skip = (page - 1) * limit;

      const allProducts = await ProductModel.find()
        .skip(skip)
        .limit(limit)
        .exec();
      if (allProducts.length === 0) {
        return res.status(404).send("No books found");
      }
      return res.status(200).send({
        count: allProducts.length,
        status: 200,
        data: [allProducts],
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },

  //? Search for Products

  searchProducts: async (req, res) => {
    try {
      const { product_name, short_description, sku, minPrice, maxPrice } =
        req.query;

      const productName = String(product_name);
      const shortDescription = String(short_description);
      const SKU = String(sku);

      const searchQuery = {
        $or: [
          { product_name: { $regex: productName, $options: "i" } },
          { short_description: { $regex: shortDescription, $options: "i" } },
          { sku: { $regex: SKU, $options: "i" } },
        ],
      };

      //? To search with minPrice and maxPrice
      if (minPrice !== undefined && maxPrice !== undefined) {
        searchQuery["$or"].push({
          price: {
            $gte: parseInt(minPrice),
            $lte: parseInt(maxPrice),
          },
        });
      } else if (minPrice !== undefined) {
        searchQuery["$or"].push({
          price: {
            $gte: parseInt(minPrice),
          },
        });
      } else if (maxPrice !== undefined) {
        searchQuery["$or"].push({
          price: {
            $lte: parseInt(maxPrice),
          },
        });
      }

      const searchedProducts = await ProductModel.find(searchQuery);

      // Send the search results as a JSON response
      return res.status(200).json(searchedProducts);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },

  //? GET PRODUCT BY ID

  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).send("Id is required for search");
      }
      //? You can use also findOne({_id:id})
      const searchedProduct = await ProductModel.findById(id);
      if (!searchedProduct) {
        return res.status(404).send("Product not found");
      }
      return res.status(200).send({
        data: searchedProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },

  //? UPDATE PRODUCTS PUT/PATCH

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        { $set: body },
        {
          new: true,
        }
      );

      return res.status(200).send({ status: "Updated", data: updatedProduct });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },
  //? DELETE PRODUCTS

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).send("ID is required for deletion");
      }
      const deleteProduct = await ProductModel.findByIdAndDelete(id);
      if (!deleteProduct) {
        return res.status(404).send("Product not found");
      }

      res
        .status(200)
        .send({ status: "Delete Success", deleteProduct: deleteProduct });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },
};
module.exports = productController;
