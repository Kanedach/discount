import {NextFunction, Request, Response} from "express";
import request from "request";
import cheerio from "cheerio";
import {Discount} from "../models/Discount";
import logger from "../util/logger";

const discount: Discount = {
    date: new Date(),
    shops: [],
};


export const getAll = (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    galaxus("https://www.digitec.ch/de/LiveShopping/", "Digitec", 0);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    galaxus("https://www.galaxus.ch/de/LiveShopping/", "Galaxus", 1);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    dayDeal("https://www.daydeal.ch/", "DayDeal", 2);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    dayDeal("https://www.daydeal.ch/deal-of-the-week", "DayDeal of the Week", 3);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    dayDeal("https://www.blickdeal.ch/", "Blick Deal of the Week", 4);

    setTimeout( () => { res.status(200).json(discount); }, 3000 );
};

function galaxus(uri: string, name: string, i: number): void {
    request(uri, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const offer = $(".liveshoppingbigProduct");
            const product = offer.find($(".productName")).first().text();
            let price = offer.find($(".ZZcn")).first().text();
            let availableQuantitySize
            let availableQuantity = offer.find($(".ZZqn")).find("strong").first().text();
            let totalQuantity = offer.find($(".ZZqn")).text();
            if(availableQuantity.match(/\d/g)==null) {
                availableQuantity = "0";
                // @ts-ignore
                totalQuantity = totalQuantity.match(/\d/g).join("");
            } else {
                const availableQuantityArray = availableQuantity.match(/\d/g);
                // @ts-ignore
                availableQuantity = availableQuantityArray.join("");
                // @ts-ignore
                availableQuantitySize = availableQuantityArray.length;
            }


            // @ts-ignore
            const img = offer.find($("img")).attr("src").toString();


            discount.shops[i] = {
                shopName: name,
                shopUrl: uri,
                img: img,
                product: product,
                newPrice: price,
                oldPrice: "",
                availablePercentage: null,
                availableQuantity: availableQuantity,
                totalQuantity: totalQuantity

            };
        }
    });
}

function dayDeal(uri: string, name: string, i: number): void {
    request(uri, (error, response, html) => {
        const $ = cheerio.load(html);
        const offer = $(".product");
        // @ts-ignore
        const img = offer.find($(".product-img")).children("img").attr("src");
        const newPrice = offer.find($(".product-pricing__prices")).find("h2").text();
        const oldPrice = offer.find($(".product-pricing__prices-old-price")).find("span").first().text();
        // @ts-ignore
        const productTitle = offer.find($(".product-description")).find("h1").text();
        const productName = offer.find($(".product-description")).find("h2").text();
        const availablePercentage = offer.find($(".product-progress__title")).find("strong").text();

        discount.shops[i] = {
            shopName: name,
            shopUrl: uri,
            // @ts-ignore
            img: img,
            product: productTitle+": "+productName,
            // @ts-ignore
            newPrice: newPrice.match(/\d/g).join(""),
            // @ts-ignore
            oldPrice: oldPrice.match(/\d/g).join(""),
            // @ts-ignore
            availablePercentage: availablePercentage.match(/\d/g).join(""),
            availableQuantity: null,
            totalQuantity: null
        };
    });
}
