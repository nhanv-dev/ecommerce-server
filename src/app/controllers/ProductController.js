const Product = require('../models/Product');

class ProductController {

    async save(req, res) {
        try {
            const product = await Product.saveProduct(productExample);
            return res.status(200).json({success: true, product});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findAll(req, res) {
        try {
            const {category} = req.query;
            // const product = await Product.getAll(category);
            return res.status(200).json({success: true});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findOne(req, res) {
        try {
            const product = await Product.getProductById(req.param.id);
            return res.status(200).json({success: true, category: category});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }
}

module.exports = new ProductController


const productExample = {
    name: 'Laptop HP 15s-fq2660TU 6K793PA (15.6" HD/Intel Core i3-1115G4/4GB/512GB SSD/Windows 11 Home/1.7kg)',
    description: '<p>CPU: Intel Core i3-1115G4 </p>' +
        '<p>Màn hình: 15.6" (1366 x 768)</p>' +
        '<p>RAM: 1 x 4GB DDR4 3200MHz</p>' +
        '<p>Đồ họa: Intel UHD Graphics </p>' +
        '<p>Lưu trữ: 512GB SSD M.2 NVMe </p>' +
        '<p>Hệ điều hành: Windows 11 Home </p>' +
        '<p>Pin: 3 cell 41 Wh Pin liền </p>' +
        '<p>Khối lượng: 1.7 kg</p>',
    sellPrice: 17690000,
    discountPercent: 12,
    quantity: 37,
    sold: '32k',
    assess: 15,
    rating: 4.7,
    tags: ['Ready to ship', 'Yêu thích', 'Uy tín'],
    images: [
        {url: 'https://media3.scdn.vn/img4/2020/07_18/VRgIY9Ef0d7fw9H6y60g.jpg'},
        {url: 'https://media3.scdn.vn/img4/2020/07_18/VRgIY9Ef0d7fw9H6y60g.jpg'},
        {url: 'https://i5.walmartimages.com/asr/0ee198a5-e8f2-4d92-9cc7-ce610dc2eb2e.eee8074ec77e7af0c9e2e2072b680d3a.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'},
        {url: 'https://media3.scdn.vn/img4/2020/07_18/D60LwetfoGa8Y1JUEvXT.jpg'},
        {url: 'https://imageio.forbes.com/specials-images/imageserve/627fa3b6a736222d2161069c/0x0.jpg?format=jpg&crop=2276,1279,x145,y97,safe&width=1200'},
        {url: 'https://media3.scdn.vn/img4/2020/07_18/VRgIY9Ef0d7fw9H6y60g.jpg'},
        {url: 'https://media3.scdn.vn/img4/2020/07_18/D60LwetfoGa8Y1JUEvXT.jpg'},
        {url: 'https://imageio.forbes.com/specials-images/imageserve/627fa3b6a736222d2161069c/0x0.jpg?format=jpg&crop=2276,1279,x145,y97,safe&width=1200'},
    ],
    color: [
        {
            name: 'Đỏ',
            price: '3000',
            img: 'https://i5.walmartimages.com/asr/0ee198a5-e8f2-4d92-9cc7-ce610dc2eb2e.eee8074ec77e7af0c9e2e2072b680d3a.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'
        },
        {
            name: 'Xanh',
            price: '3000',
            img: 'https://i5.walmartimages.com/asr/0ee198a5-e8f2-4d92-9cc7-ce610dc2eb2e.eee8074ec77e7af0c9e2e2072b680d3a.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'
        },
        {
            name: 'Vàng',
            price: '3000',
            img: 'https://i5.walmartimages.com/asr/0ee198a5-e8f2-4d92-9cc7-ce610dc2eb2e.eee8074ec77e7af0c9e2e2072b680d3a.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'
        },
    ],
    owner: {},
    info: [
        {name: "Màn hình", value: "15.6 inch HD"},
        {name: "Hãng sản xuất", value: "HP"},
        {name: "Hệ điều hành", value: "Windows"},
        {name: "Ổ cứng", value: "512GB SSD"},
        {name: "Ram", value: "4GB"},
        {name: "Vi xử lí", value: "Intel Core i3-1115G4"},
        {name: "Cân nặng", value: "1.7kg"},
    ],
}