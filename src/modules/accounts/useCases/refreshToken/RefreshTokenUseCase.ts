import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute(token: string): Promise<ITokenResponse> {
        const { email, sub } = verify(
            token,
            process.env.SECRET_REFRESH_TOKEN
        ) as IPayload;

        const user_id = sub;

        const userToken =
            await this.usersTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token
            );

        if (!userToken) {
            throw new AppError("Refresh token does not exists!");
        }

        await this.usersTokensRepository.deleteByID(userToken.id);

        const refresh_token = sign(
            { email },
            process.env.SECRET_REFRESH_TOKEN,
            {
                subject: sub,
                expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN,
            }
        );

        const expires_date = this.dateProvider.addDays(
            Number(process.env.EXPIRES_REFRESH_TOKEN_DAYS)
        );

        await this.usersTokensRepository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        const newToken = sign({}, process.env.SECRET_TOKEN, {
            subject: user_id,
            expiresIn: process.env.EXPIRES_IN_TOKEN,
        });

        return { token: newToken, refresh_token };
    }
}
export { RefreshTokenUseCase };
