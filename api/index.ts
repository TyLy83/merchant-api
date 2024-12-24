
import App from "./app";
import ProductController from "./controllers/product.controller";
import AuthController from "./controllers/auth.controller";
import ContactController from "./controllers/contact.controller";
import StoreController from "./controllers/store.controller";
import LocationController from "./controllers/location.controller";
import ProductVariantController from "./controllers/product.variant.controller";
import CategoryController from "./controllers/category.controller";
import ProdcutVariantOptionController from "./controllers/product.variant.option.controller";
import RoleController from "./controllers/role.controller";
import UserRoleController from "./controllers/user.role.controller";

import ProductImageController from "./controllers/product.image.controller";

const app = new App([
    new AuthController(), 
    new ContactController(), 
    new StoreController(),
    new ProductController(), 
    new LocationController(),
    new ProductVariantController(),
    new CategoryController(),
    new ProdcutVariantOptionController(),
    new RoleController(),
    new UserRoleController(),
    new ProductImageController()
]);

app.listen();