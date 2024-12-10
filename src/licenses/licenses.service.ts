import { Injectable } from '@nestjs/common';
import { License } from './license.entity';
import { v4 as uuidv4 } from 'uuid'; // Para generar IDs únicos

@Injectable()
export class LicensesService {
  private licenses: License[] = [];

  findAll(): License[] {
    return this.licenses;
  }

  findOne(id: string): License | undefined {
    return this.licenses.find(license => license.id === id);
  }

  create(licenseData: Partial<License>): License {
    const newLicense: License = {
      id: uuidv4(),
      ...licenseData,
      issuedDate: new Date(),
    } as License;
    this.licenses.push(newLicense);
    return newLicense;
  }

  update(id: string, updateData: Partial<License>): License | undefined {
    const licenseIndex = this.licenses.findIndex(license => license.id === id);
    if (licenseIndex === -1) return undefined;

    this.licenses[licenseIndex] = {
      ...this.licenses[licenseIndex],
      ...updateData,
    };
    return this.licenses[licenseIndex];
  }

  delete(id: string): boolean {
    const initialLength = this.licenses.length;
    this.licenses = this.licenses.filter(license => license.id !== id);
    return this.licenses.length < initialLength;
  }
}
