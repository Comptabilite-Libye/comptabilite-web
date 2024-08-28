export class MfaVerificationResponse {
    userName!: string;
    jwt!: string;
    authValid!: boolean;
    mfaRequired!: boolean;
    tokenValid!: boolean;
    message!: string;
    constructor(userName: string,
        jwt: string,
        tokenValid: boolean,
        authValid: boolean,
        mfaRequired: boolean,
        message: string){
            this.userName = userName!=null?userName:"";
            this.jwt = jwt!=null?jwt:"";
            this.message = message!=null?message:"";
            this.mfaRequired = mfaRequired!=null?mfaRequired:false;
            this.tokenValid = tokenValid!=null?tokenValid:false;
            this.authValid = authValid!=null?authValid:false;
        }
}