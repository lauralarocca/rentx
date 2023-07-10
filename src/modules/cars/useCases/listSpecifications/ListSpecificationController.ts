import { Request, Response } from "express";

import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

class ListSpecificationController {
    constructor(private listSpecificationUseCase: ListSpecificationUseCase) {}

    handle(request: Request, response: Response): Response {
        const all = this.listSpecificationUseCase.execute();
        return response.json(all);
    }
}

export { ListSpecificationController };
