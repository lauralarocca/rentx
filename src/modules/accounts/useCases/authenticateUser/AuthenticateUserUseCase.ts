import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect!");
        }

        const passwordMath = await compare(password, user.password);

        if (!passwordMath) {
            throw new AppError("Email or password incorrect!");
        }

        const token = sign({}, process.env.SECRET_TOKEN, {
            subject: user.id,
            expiresIn: process.env.EXPIRES_IN_TOKEN,
        });

        const refresh_token = sign(
            { email },
            process.env.SECRET_REFRESH_TOKEN,
            {
                subject: user.id,
                expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN,
            }
        );

        const refresh_token_expires_date = this.dateProvider.addDays(
            Number(process.env.EXPIRES_REFRESH_TOKEN_DAYS)
        );
        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date: refresh_token_expires_date,
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
            refresh_token,
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
