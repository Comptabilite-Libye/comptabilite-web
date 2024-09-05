export interface Caisse{
    code: number,
    codeSaisie: string,
    designationAr: string,
    designationLt: string,
    actif: boolean,
}

export interface Devise{
    code: number, 
    designationAr: string,
    designationLt: string,
    actif: boolean,
}


export interface Banque{
    code: number, 
    designationAr: string,
    designationLt: string,
    actif: boolean,
}


export interface Beneficiaire{
    code: number, 
    designationAr: string,
    designationLt: string,
    actif: boolean,
}

export interface Fournisseur{
    code: number, 
    designationAr: string,
    designationLt: string,
    actif: boolean,
}

export interface TypeDepense{
    code: number, 
    designationAr: string,
    designationLt: string,
    actif: boolean,
}

export interface TypeRecette{
    code: number, 
    designationAr: string,
    designationLt: string,
    actif: boolean,
}

export interface ModeReglement{
    code: number,
    codeSaisie: string,
    designationAr: string,
    designationLt: string,
    actif: boolean,
}


export interface TauxDeChange{
    code: number,
    tauxChange: string,
    deviseDTO:{
        code:number,
        designationAr:string,
        designationLt:string
    }
}
