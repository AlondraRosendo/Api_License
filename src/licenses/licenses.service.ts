import { Injectable } from '@nestjs/common';
import { License } from './license.entity';
import { randomUUID } from 'crypto'; // Generación de IDs únicos

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
      id: randomUUID(),
      ...licenseData,
      issuedDate: new Date(),
      isActive: true, // Las licencias son activas al crearse
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

  revoke(id: string): boolean {
    const license = this.findOne(id);
    if (!license) return false;

    license.isActive = false; // Revocar la licencia desactivándola
    return true;
  }

  getStatus(id: string): string | undefined {
    const license = this.findOne(id);
    if (!license) return undefined;

    return license.isActive ? 'Active' : 'Revoked';
  }

  validate(licenseKey: string): boolean {
    const license = this.licenses.find(
      license =>
        license.licenseKey === licenseKey &&
        license.isActive &&
        new Date() < new Date(license.expiryDate),
    );
    return !!license; // Devuelve true si la licencia es válida
  }
}
