import { Controller, Get, Param, Post } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('/contract')
@Controller('/contract')
export class ContractController {
  constructor(
    private readonly contractService: ContractService,
) {}

  @Post('/enroll-institution')
  enrollInstitution(): string {
    return this.contractService.enrollInstitution();
  }

  @Get('/enrolled-institution/:address')
  async getEnrolledInstituion(
    @Param('address') address: string,
  ) {
    return await this.contractService.getEnrolledInstitution(address);
  }


  @Get('/enrollment-fee')
  async getEnrollmentFee() {
    return await this.contractService.getEnrollmentFee();
  }

  @Post('/whitelist-address')
  whitelistAddress(): string {
    return this.contractService.whitelistAddress();
  }

  @Get('/whitelisted-addresses')
  getWhiteListedAddresses(): string {
    return this.contractService.getWhiteListedAddresses();
  }
}
