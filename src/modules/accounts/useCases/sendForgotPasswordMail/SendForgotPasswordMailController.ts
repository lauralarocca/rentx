import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

class SendForgotPasswordMailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const sendForgorPasswordMailUseCase = container.resolve(
            SendForgotPasswordMailUseCase
        );

        await sendForgorPasswordMailUseCase.execute(email);

        return response.send();
    }
}

export { SendForgotPasswordMailController };
