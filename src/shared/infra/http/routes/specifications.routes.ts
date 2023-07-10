import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

// import { listSpecificationController } from "../modules/cars/useCases/listSpecifications";

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(ensureAuthenticated);

specificationRoutes.post(
    "/",
    ensureAdmin,
    createSpecificationController.handle
);

// specificationRoutes.get("/", (request, response) => {
//     return listSpecificationController.handle(request, response);
// });

export { specificationRoutes };
