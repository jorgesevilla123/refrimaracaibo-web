
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




function showMake(req, res){


 
    Product.find( (err, products) => {
        if(err){
            console.log(err)
        }
        else {
            let makeList = []
           products.forEach( (product) => {
            if(makeList.includes(product.make)){
               
            }
            else {
                makeList.push(product.make);
            
            }
           })
           console.log(makeList.sort());
        }
    })
  
    res.send('sending the values');

    
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



function getOneProduct(req, res){
    let id = req.query.id
    Product.find({_id: id},).exec(
        (err, product) => {
            if(err) {console.log(err)}
            else {
                res.json({product})

            }
        }
    )
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




function generalFilter(req, res){
    let category = req.query.filter
    let page = req.query.page
    let itemsPerPage = 42
    let queryFilter = {
        categoria: category
    }

    console.log(queryFilter);
    Product.find(queryFilter).exec((err, products) => {
        if(err){
            res.json({message:'hubo un error buscando la categoria: ', error: err})
        }
        else {
            // console.log(products)
      
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





//this function will be the queryBuilder
function generalPaginationFunction(req, res){
    let itemsPerPage = 43
    let query = req.query.q
    let make = req.query.make
    let category = req.query.categoria
    let price = req.query.precio
    let regex;
    let page = req.query.page
    console.log('logggin category', category);

    console.log('loggin query', req.query)
    
    const isValidJson = str => {
        try {
            JSON.parse(str)
            return true
            
        } catch (error) {
            return false
        }
    }


    let {routePath} = req.body;

    let parsedCategory = ''
    let parsedMake = ''
    if(category){
        if(isValidJson(category)){
            console.log('is a valid json')
            
            parsedCategory = JSON.parse(category)
            console.log('showing parsed category: ', parsedCategory)
        }
        else {
            console.log('not a valid json')
            parsedCategory = category
        }
        console.log('loggin category: ', category)
    }
    

    if(make){
        if(isValidJson(make)){
            console.log('is a valid json')
            parsedMake = JSON.parse(make)
        }
        else {
            console.log('not a valid json')
            parsedMake = make
        }
    }

    console.log('loggin parsed make: ', parsedMake)









    
    //destructuring queries coming from the client
    const queryObj = {...req.query}
    // let dbQueryBody = {$and: [{categoria: category, title: regex}]}
    let dbQueryBody = {$and:[]}
    

    var size = Object.keys(queryObj).length;
    console.log(size);


    if('q' in queryObj){
    regex = new RegExp(`${query}`, 'gi')
    dbQueryBody.$and.push({$or: [{title: regex}, {modelo: regex}]})
    }
    if('categoria' in queryObj && typeof parsedCategory !== "string" && parsedCategory.length !== 0){
        console.log('loggin parsed category because is not a string')
        dbQueryBody.$and.push({categoria: {$in: parsedCategory}})
      
    }
    if('precio' in queryObj){
        dbQueryBody.$and.push({precio: {$lte: price}})
    }


    if('make' in queryObj && typeof parsedMake !== "string" && parsedMake.length !== 0){
        console.log('loggin parsed make because is not a string')
        dbQueryBody.$and.push({make: {$in: parsedMake}})
    }

    queryObj


    Product.find(dbQueryBody).exec((err, foundProducts) => {
        Product.countDocuments((err, count) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(foundProducts)
            

                let queryParams = {
                    queryParams: queryObj
                }
                let pageToInt = parseInt(page);
                const pager = paginate(foundProducts.length, pageToInt, itemsPerPage);
                const pageOfItems = foundProducts.slice(pager.startIndex, pager.endIndex + 1);
                res.json({ products: foundProducts, current: page, pages: Math.ceil(foundProducts.length / itemsPerPage), count: count, pageOfItems, pager, paginatorRoute: routePath, queryParams})
            }
        })
    })
}








module.exports = {getProducts, searchProducts, decreaseInventory, getProductsByCategory, 
    filterCategory, getSomeProducts, filterTools, getOneProduct, generalFilter, generalPaginationFunction, showMake}


