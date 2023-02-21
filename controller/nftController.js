const Product = require('../models/Mint');
const User = require('../models/User');

const addNft = async (req, res) => {
  try {
	  
	  const user = await User.findOne({ userwallet: req.body.wallet_address });
	  
		var nftid = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 15; i++){
		nftid += possible.charAt(Math.floor(Math.random() * possible.length));
		}
	
	
	  
	  const mintData = {
        name: req.body.name,          
        description: req.body.description,
        parent: req.body.parent,
        wallet_address:req.body.wallet_address,
        contact_address:'',
        username:user.username,
        userimage:user.image,
        userfullname:user.name,
        is_mint:0,
        mktid:0,
        price:'',
        nftid:nftid,
        contractid:'',
        status:'created',
        image: req.body.image
        
      };
	  console.log(mintData);
	
	  //await Product.insertOne(mintData);
    const newProduct = new Product(mintData);
    await newProduct.save();
    res.status(200).send({
      message: 'Nft Added Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addAllNfts = async (req, res) => {
  try {
    await Product.deleteMany();
    await Product.insertMany(req.body);
    res.status(200).send({
      message: 'Nft Added successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShowingNfts = async (req, res) => {
  try {
    const products = await Product.find({ status: 'Show' }).sort({ _id: -1 });
    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getDiscountedNfts = async (req, res) => {
  try {
    const products = await Product.find({ discount: { $gt: 5 } }).sort({
      _id: -1,
    });
    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllNfts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 });
	//console.log(products);
	
		/*products.forEach(object => {
		 //const user = User.findOne({ userwallet: object.wallet_address });
		  object.userdata =object.wallet_address;
		 // console.log(user);
		});*/
		
		/*const arrWithColor = products.map(object => {
			const user = User.findOne({ userwallet: object.wallet_address });
		  return {...object, userdata: user};
		});*/

	let items1=[];
	for(var i=0;i<products.length;i++){
		
		//const user = await Follow.findOne({ from_user: req.body.from_user ,to_user: users[i].userwallet});

      var obj = {};
    
        const user = await User.findOne({userwallet: products[i].wallet_address});
      obj['description'] =products[i].description;
      obj['createdAt'] = products[i].createdAt;
      obj['parent'] = products[i].parent;
      obj['wallet_address'] =products[i].wallet_address;
      obj['contact_address'] =products[i].contact_address;
      obj['username'] =products[i].username;
      obj['userimage'] =products[i].userimage;
      obj['userfullname'] =products[i].userfullname;
      obj['price'] =products[i].price;
      obj['nftid'] =products[i].nftid;
      obj['status'] =products[i].status;
      obj['contractid'] =products[i].contractid;
      obj['image'] = products[i].image;
      obj['name'] = products[i].name;
      obj['updatedAt'] = products[i].updatedAt;        
      obj['userwallet'] = products[i].userwallet;
      obj['_v'] = products[i]._v;
      obj['_id'] = products[i]._id;
      if(user){
      obj['userData'] = user;
      
      }else{
		   obj['userData'] = {};
	  }

      items1.push(obj);
 
         
     

   }
	
    res.send(items1);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getStockOutNfts = async (req, res) => {
  try {
    const products = await Product.find({ quantity: { $lt: 1 } }).sort({
      _id: -1,
    });

    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getNftBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    res.send(product);
  } catch (err) {
    res.status(500).send({
      message: `Slug problem, ${err.message}`,
    });
  }
};

const getNftById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateNft = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
     
      product.name = req.body.name;
     
      product.description = req.body.description;
      product.parent = req.body.parent;
      product.wallet_address = req.body.wallet_address;
      
      product.image = req.body.image;
     // product.status = 'added';
    
      await product.save();
      res.send({ data: product, message: 'Nft updated successfully!' });
    }
    // handleProductStock(product);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const updateStatus = (req, res) => {
  const newStatus = req.body.status;
  Product.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: newStatus,
      },
    },
    (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: `Nft ${newStatus} Successfully!`,
        });
      }
    }
  );
};

const deleteNft = (req, res) => {
  Product.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'Nft Deleted Successfully!',
      });
    }
  });
};

module.exports = {
  addNft,
  addAllNfts,
  getAllNfts,
  getShowingNfts,
  getDiscountedNfts,
  getStockOutNfts,
  getNftById,
  getNftBySlug,
  updateNft,
  updateStatus,
  deleteNft,
};
