interface IMailProvider {
    sendMail(
        to: string,
        subject: string,
        variables,
        path: string
    ): Promise<void>;
}

export { IMailProvider };
