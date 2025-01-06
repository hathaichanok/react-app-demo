class Geo {
    lat: string;
    lng: string;

    constructor(lat: string, lng: string) {
        this.lat = lat;
        this.lng = lng;
    }
}

class Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;

    constructor(street: string, suite: string, city: string, zipcode: string, geo: Geo) {
        this.street = street;
        this.suite = suite;
        this.city = city;
        this.zipcode = zipcode;
        this.geo = geo;
    }

    getFullAddressInfo = () => {
        return this.suite + ", " + this.street + ", " + this.city + ", " + this.zipcode
    }

    getGeoLink = () => {
        return 'https://maps.google.com/?q=' + this.geo.lat + ',' + this.geo.lng
    }
}

class Company {
    name: string;
    catchPhrase: string;
    bs: string;

    constructor(name: string, catchPhrase: string, bs: string) {
        this.name = name;
        this.catchPhrase = catchPhrase;
        this.bs = bs;
    }

    getFullCompanyInfo = () => {
        return this.name + " (" + this.bs + ") - " + this.catchPhrase;
    }
}

class User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: Address;
    company: Company;

    constructor(id: number, name: string, username: string, email: string, phone: string, website: string, address: Address, company: Company) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.website = website;
        this.address = address;
        this.company = company;
    }
}

class UserData {
    user: User;

    constructor(userData: any)
    {
        const geo = new Geo(userData.address.geo.lat, userData.address.geo.lng);
        const address = new Address(
            userData.address.street,
            userData.address.suite,
            userData.address.city,
            userData.address.zipcode,
            geo
        );
        const company = new Company(
            userData.company.name,
            userData.company.catchPhrase,
            userData.company.bs
        );
                  
        this.user = new User(
            userData.id,
            userData.name,
            userData.username,
            userData.email,
            userData.phone,
            userData.website,
            address,
            company
        );
    }

    getUser = () => {
        return this.user
    }
}

export { UserData, User }
