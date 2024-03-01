import { fakerES as faker } from '@faker-js/faker';
import { Establishment } from '../../models/Establishment';

export const generateFakeEstablishments = () => {
    const establishment = new Establishment();
    establishment.address = faker.location.streetAddress({ useFullAddress: true });
    establishment.city = faker.location.city();
    establishment.postalCode = parseInt(faker.location.zipCode());
    return establishment;
};