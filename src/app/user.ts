export interface Users{ 
    /**define all attributes that a user will have. this represents the type of data that will be returned when making call to the backend*/
    id: Number;
    emailAddress: string;
    firstName: string;
    lastName: string;
    password: string;
}