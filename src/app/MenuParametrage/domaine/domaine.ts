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