
const Product = require('../models/product-models')


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








function getProducts(req, res){
    Product.find( (err, products) => {
        if(err){
            res.send(err)
        }
        else {
            res.json(products)
        }

    })
}



function getSomeProducts(req, res){
    Product.find( (err, products) => {
        if(err){
            res.send(err)
        }
        else {
            res.json(products)
        }

    }).limit(4)
}





function filterTools(req, res){
    let categoriaQuery = 'HERRAMIENTAS'

    Product.find({categoria: categoriaQuery}, (products) => {
    
        console.log(categoria)
        res.send('hello sending response')

    })

}









function searchProducts(req, res){
    let query = req.query.q
    console.log(query)
    let regex = new RegExp(`${query}`, 'gi')
    let page = req.query.page
    let itemsPerPage = 40;




    Product.find({ $or: [{ title: regex }, { modelo: regex}] })
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







function getProductsByCategory(req, res){
    let category = req.params.category
    let page = req.params.page
    let pageName = req.params.pageName
    console.log('reading pagename', pageName)
    let categoryUpCase = category.toUpperCase()
    console.log(categoryUpCase)
    let itemsPerPage = 42
    Product.find({categorias: [categoryUpCase]}).exec(
        (err, products) => {
            if(err){
                res.json({ message: 'Error ocurred', err })
            }
            else {
                let count = products.length
                let pageToInt = parseInt(page);
                const pager = paginate(products.length, pageToInt, itemsPerPage);
                const pageOfItems = products.slice(pager.startIndex, pager.endIndex + 1);
                res.json({ products: products, current: page, pages: Math.ceil(products.length / itemsPerPage), count: count, pageOfItems, pager, pageName: pageName })
            }
        }
    
    )
}



function filterCategory(req, res){
   
    let query = req.query.q
    let category = req.query.category
    let page = req.query.page
    let itemsPerPage = 42
    console.log(query)
    console.log('showing line 196', category)
    console.log('showing line 197', page)
    let regex = new RegExp(`${query}`, 'gi')
    console.log(query)
    Product.find({$and: [{categoria: category, title: regex}]})
    .exec((err, products) => {
        if(err){console.log(err)}
        else {
            console.log(products)
            let count = products.length
            let pageToInt = parseInt(page);
            const pager = paginate(products.length, pageToInt, itemsPerPage);
            const pageOfItems = products.slice(pager.startIndex, pager.endIndex + 1);
            res.json({ products: products, current: page, pages: Math.ceil(products.length / itemsPerPage), count: count, pageOfItems, pager})
        }
    })
}








function decreaseInventory(products){
    console.log(products)



    products.forEach( (product) => {
        Product.updateOne({_id: product._id}, {$inc: {cantidad: -product.cantidad}}, (err, products) => {
            if(err){
                console.log(err)
            }
            else {
                console.log('Products quantity updated')
            }
        })
    })



    



}


function increaseInventory(req, res){

}








module.exports = {getProducts, searchProducts, decreaseInventory, getProductsByCategory, filterCategory, getSomeProducts, filterTools}


