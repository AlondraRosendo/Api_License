import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { License } from './license.entity';

@Controller('licenses')
export class LicensesController {
  constructor(private readonly licensesService: LicensesService) {}

  @Get()
  getAllLicenses(): License[] {
    return this.licensesService.findAll();
  }

  @Get(':id')
  getLicense(@Param('id') id: string): License | undefined {
    return this.licensesService.findOne(id);
  }

  @Post()
  createLicense(@Body() licenseData: Partial<License>): License {
    return this.licensesService.create(licenseData);
  }

  @Put(':id')
  updateLicense(@Param('id') id: string, @Body() updateData: Partial<License>): License | undefined {
    return this.licensesService.update(id, updateData);
  }

  @Delete(':id')
  deleteLicense(@Param('id') id: string): boolean {
    return this.licensesService.delete(id);
  }

  @Post(':id/revoke')
  revokeLicense(@Param('id') id: string): boolean {
    return this.licensesService.revoke(id);
  }

  @Get(':id/status')
  getLicenseStatus(@Param('id') id: string): string | undefined {
    return this.licensesService.getStatus(id);
  }

  @Post('validate')
  validateLicense(@Body('licenseKey') licenseKey: string): boolean {
    return this.licensesService.validate(licenseKey);
  }
}
