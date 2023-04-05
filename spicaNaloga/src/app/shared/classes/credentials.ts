export class Credentials {
    client_id: string;
    client_secret: string;
    constructor(client_id: string, client_secret: string) {
        this.client_id = client_id;
        this.client_secret = client_secret;
    }
}