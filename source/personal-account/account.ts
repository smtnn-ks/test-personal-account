export class Account {
    public id: string;
    public email: string;
    public name: string;
    public number: string;
    public status: AccountStatus;

    constructor(id: string, email: string, name: string, number: string, status: AccountStatus) {
        this.id = id
        this.email = email
        this.name = name
        this.number = number
        this.status = status
    }
}

export type AccountStatus = "Open" | "Close";
