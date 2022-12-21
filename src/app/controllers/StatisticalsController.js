const Order = require('../models/Order');

class StatisticalsController {
    async daily(req, res) {
        try {
            const sum = await Order.aggregate(
                [
                    {
                        $group:
                            {
                                _id: {day: {$dayOfMonth: "$createdAt"}, year: {$year: "$createdAt"}},
                                totalAmount: {$sum: "$total"}, count: {$sum: 1}
                            }
                    }
                ]
            )
            console.log(sum)
            // let total = sum[0].totalAmount;
            // const orders = await Order.find();
            // const data = orders.filter(item => {
            //     if (item.createdAt.getDay() === new Date().getDay()) {
            //         return item;
            //     }
            // });
            // console.log(orders);
            return res.status(200).json({success: true, response: sum});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }
}

module.exports = new StatisticalsController
