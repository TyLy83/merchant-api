
import App from "./app";
import ProductController from "./controllers/product.controller";
import AuthController from "./controllers/auth.controller";
import ContactController from "./controllers/contact.controller";
import StoreController from "./controllers/store";
import LocationController from "./controllers/location.controller";
import ProductVariantController from "./controllers/product.variant.controller";
import CategoryController from "./controllers/category.controller";
import ProdcutVariantOptionController from "./controllers/product.variant.option.controller";

const app = new App([
    new AuthController(), 
    new ContactController(), 
    new StoreController(),
    new ProductController(), 
    new LocationController(),
    new ProductVariantController(),
    new CategoryController(),
    new ProdcutVariantOptionController()
]);

app.listen();