export class Order{
    id?:number=0;
    usersId?:number=0;
    dateOfOrder!:Date;
    modeOfPayment: any;
    billAmount:number=0;
}