import Product from '../models/product-models'
import { Request, Response } from 'express'
import { AWS_BUCKET_FOLDER, AWS_BUCKET_REGION, AWS_BUCKET_URL } from '../config'
import { deleteFile, uploadFile } from '../AWS-S3-HANDLERS'
import ProductToOrder from '../models/products-to-order'
import path from 'path'



function paginate(
    totalItems,
    currentPage,
    pageSize,
    maxPages = 10
) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage, endPage
    if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = totalPages;
    } else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            // current page near the start
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // current page near the end
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        } else {
            // current page somewhere in the middle
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);



    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: parseInt(currentPage),
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}



function generateRandomInteger(maxNumber) {
    return Math.floor(Math.random() * maxNumber) + 1

}








export function addProduct(req: Request, res: Response) {

    const { title, modelo, precio, cantidad, ubicacion, categoria } = req.body;


    let S3Folder = AWS_BUCKET_FOLDER
    let filename = req.files.imagePath.name
    let realfile = path.parse(filename)
    let extension = realfile.ext
    let randomNumber: any = generateRandomInteger(10000)
    let newFilename = realfile.name + randomNumber + extension

    let imagePath = `https://refriproductsimg.s3.us-east-2.amazonaws.com/${S3Folder}/${newFilename}`

   
    console.log(title, modelo, precio, cantidad, ubicacion, categoria);

    console.log(imagePath)






    // this metadata of the images will help us save and retrieve the images from aws S3 service
     let imageMetadata = { s3_folder: '', filename: '', path_to_file: '' }
     if (req.files == undefined) {
         imageMetadata.s3_folder = ''
         imageMetadata.filename = 'no-photo'

     }
     else {
         imageMetadata.s3_folder = S3Folder
         imageMetadata.filename = newFilename
         imageMetadata.path_to_file = imagePath
     }




    // Here we save the product to the DB
    const newProduct = new Product({ title, modelo, cantidad, precio, ubicacion, imagePath, categoria,imageMetadata , filename: newFilename})
    newProduct.save((err, product) => {
        if (err) {
            console.log(err)
        }
        else {

            // this helper function let us save the imagesBien 
            uploadFile(req.files.imagePath, newFilename).then(
                (result) => {
                    console.log('image saved', result)
                }
            )
            res.json({ product, message: 'Producto guardado, cargando imagen' })
            // after file is uploaded 

        }

    });

}












export function getProducts(req: Request, res: Response) {
    Product.find((err, products) => {
        if (err) {
            res.send(err)
        }
        else {
            res.json(products)
        }

    })
}


export function calculateTotal(req: Request, res: Response){
    let total;
    Product.find((err, products) => {
        if(err){
            console.log(err)
        }
        else {
           total = products.reduce((accumulator: any, currentValue) => 
            accumulator + currentValue.precio*currentValue.cantidad
           , 0)
           res.json({total: total})
        }

    })

}







export function searchProducts(req, res) {
    let query = req.query.q
    let page = req.query.page
    let filters = req.body
    let quantityFilter
    let filterLowStock 
    console.log('passing')
    console.log(filters)
    function filterExists(arrayFilters, type) {
        return filters.some( val => val.type === type)
    }

    if(filters.length === 0){
        filterLowStock = false
    }

    else if(filterExists(filters, 'lowstock')){
        filterLowStock = true
        quantityFilter = 5
    }
    else if (filterExists(filters, 'nostock')){
        filterLowStock = true
        quantityFilter = 0
    }
  
  
    console.log('FilterLowStock: ', filterLowStock)
    console.log('FilterLowStock: ', quantityFilter)

    console.log(quantityFilter)

    
  
  
   
    let itemsPerPage = 40;
    let regex = new RegExp(`${query}`, 'gi')
    if(filterLowStock){
        console.log('filtering low stock server side')
        Product.find({ $or: [{ title: regex }, { modelo: regex }]}).where('cantidad').lte(quantityFilter)
        .exec((err, foundProducts) => {
            Product.countDocuments((err, count) => {
                if (err) {
                    console.log(err)
                }
                else {
                    let pageToInt = parseInt(page);
                    const pager = paginate(foundProducts.length, pageToInt, itemsPerPage);
                    const pageOfItems = foundProducts.slice(pager.startIndex, pager.endIndex + 1);
                    res.json({ products: foundProducts, current: page, pages: Math.ceil(foundProducts.length / itemsPerPage), count: count, pageOfItems, pager })
                }
            })
        })

    }
    else {
        console.log('Not filtering')
        Product.find({ $or: [{ title: regex }, { modelo: regex }] }, )
        .exec((err, foundProducts) => {
            Product.countDocuments((err, count) => {
                if (err) {
                    console.log(err)
                }
                else {
                    let pageToInt = parseInt(page);
                    const pager = paginate(foundProducts.length, pageToInt, itemsPerPage);
                    const pageOfItems = foundProducts.slice(pager.startIndex, pager.endIndex + 1);
                    res.json({ products: foundProducts, current: page, pages: Math.ceil(foundProducts.length / itemsPerPage), count: count, pageOfItems, pager })
                }
            })
        })
    }

    
}


export function filterProducts(req: Request, res: Response){
    let query = req.query.q
    let regex = new RegExp(`${query}`, 'gi')
    Product.find({ $or: [{ title: regex }, { modelo: regex }]}, (err, products) => {
        if(err){
            console.log(err)
        }
        else {
            console.log(products)
        }

    })

}




export async function deleteProduct(req: Request, res: Response) {
    const id = req.params.id
    let awsS3Folder = req.query.s3Folder
    let filename = req.query.filename

    //function for deleting product in DB

    // implement this function after deleting a product for deleting image in S3 service 
   
    deleteFile('uploads', filename).then(
        result => {
            console.log('File deleted from aws S3 bucket', result)
            Product.findByIdAndDelete({ _id: id }, (err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.json({ deleted: true, message: 'Product deleted!' })
                }
            })

        }
    )
}









export function updateProduct(req: Request, res: Response) {
    let id = req.params.id
    console.log(req.body)
    let { title, modelo, cantidad, precio, ubicacion, categoria } = req.body
    console.log(title)

    Product.findByIdAndUpdate({ _id: id }, { title: title, modelo: modelo, cantidad: cantidad, ubicacion: ubicacion, precio: precio, categoria: categoria }, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json({ message: 'updated' })
        }
    })
}








export function updatePhoto(req: Request, res: Response) {

    const id = req.params.id
    let actualFilename = req.query.filename
    let filename = req.files.imagePath.name
    console.log(filename)
    let realfile = path.parse(filename)
    let extension = realfile.ext
    let randomNumber: any = generateRandomInteger(10000)
    let newFilename = realfile.name + randomNumber + extension
    let awsS3Folder = AWS_BUCKET_FOLDER



 
    const imagePath = `${AWS_BUCKET_URL}/${awsS3Folder}/${newFilename}`


    deleteFile(awsS3Folder, actualFilename).then(
        result => {
                console.log('file updated!')
                uploadFile(req.files.imagePath, newFilename).then(
                    (result) => {
                        console.log('Image saved', result)
                    }
                )
        }
    )


    Product.findOneAndUpdate({ _id: id }, { $set: { imageMetadata: {s3_folder: awsS3Folder, filename: newFilename, path_to_file: imagePath}}},
        { new: true },
        (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log('Image filename updated', result)
                res.json({message: 'Image successfully updated'})
            }
        })





}


export function decreaseInventory(products) {
    console.log(products)
    products.forEach(product => {
   
    
        Product.updateOne({ title: product.title }, { $inc: { cantidad: -product.quantity } }, (err, products) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(products)
            }
        })
    })

}





export function increaseInventory(req: Request, res: Response) {

}


export function test(req, res) {
    res.send('Hello mothafucka')
}






////////////////////////////////////////products to order functions ///////////////////////////////////////////////////////



export function addProductToOrder(req: Request, res: Response){

    let {title, modelo, cantidad, estado} = req.body

    cantidad = 1
    let cantidad_pedido = cantidad
    console.log(title, modelo, cantidad, estado)
    

    const newProductToOrder = new ProductToOrder({title, modelo, cantidad_pedido, estado})


    newProductToOrder.save((err, result) => {
        if(err){
            console.log(err)
        }
        else {
            res.json({message: 'product to order'})
        }
    })
}

export function getProductsToOrder(req: Request, res: Response){
    ProductToOrder.find((err, products) => {
        if(err){
            console.log('there was an error getting products in db', err)
        }
        else {
            res.json({message: 'sending products to order from db', products})
        }
    })
}
