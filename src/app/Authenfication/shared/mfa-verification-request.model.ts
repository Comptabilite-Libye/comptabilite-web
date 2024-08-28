export class MfaVerificationRequest {
    userName!: string;
    totp!: string;
    constructor(userName: string,
        totp: string){
            this.userName = userName!=null?userName:"";
            this.totp = totp!=null?totp:"";
        }
}