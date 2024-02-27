import { Account } from "./account";
import { AccountError } from "./account.error";
import { AccountManager } from "./account.manager";
import { CloseAccountCommand } from "./close-account.command";
import { GetAccountsQuery } from "./get-accounts.query";
import { NotificationService } from "./notification.service";
import { OpenAccountCommand } from "./open-account.command";

const randomString = "some random string"
const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export class Implementation implements AccountManager {
    notificationService: NotificationService | undefined
    accounts: Account[]

    constructor(notificationService: NotificationService | undefined) {
        this.notificationService = notificationService
        this.accounts = [
            new Account("123-456-789", "customer0919@domain.ru", "Пугачева Ольга Сергеевна", randomString, "Open"),
            new Account("231-545-16-01", randomString, randomString, randomString, "Close")
        ]
    }

    async openAccount(command: OpenAccountCommand): Promise<Account> {
        if (!command.email || !command.name) throw new AccountError()
        if (!command.email.toLowerCase().match(emailRegex)) throw new AccountError()
        this.notificationService?.sendWelcomeMessage(command.email)
        return new Account(
            randomString,
            command.email,
            command.name,
            randomString,
            "Open"
        )
    }

    async closeAccount(command: CloseAccountCommand): Promise<Account> {
        if (!command.id) throw new AccountError()
        var index = this.accounts.findIndex(acc => acc.id == command.id)
        if (index == -1) throw new AccountError()
        if (this.accounts[index].status == "Close") throw new AccountError()
        this.accounts[index].status = "Close"
        return this.accounts[index]
    }

    getAccounts(query: GetAccountsQuery): Promise<Account[]> {
        throw new Error("Method not implemented.");
    }

}
