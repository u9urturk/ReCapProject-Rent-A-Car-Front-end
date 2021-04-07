export interface Rental{
    id:number;
    carId:number;
    customerId:number;
    customerName:string;
    customerLastName:string;
    customerEmail:string;
    carName:string;
    carBrand:string;
    carModel:string;
    dailyRentPrice:number;
    rentDate:Date;
    returnDate:Date;

}