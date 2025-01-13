import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ApiTags } from '@nestjs/swagger';
import { EnrollInstitution, WhitelistAddress } from './entities';
import { IPlainTransactionObject } from '@multiversx/sdk-core/out';

@ApiTags('/contract')
@Controller('/contract')
export class ContractController {
  constructor(
    private readonly contractService: ContractService,
) {}

  @Post('/enroll-institution')
  enrollInstitution(
    @Body() body: EnrollInstitution
  ): IPlainTransactionObject {
    return this.contractService.enrollInstitution(body);
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
  whitelistAddress(
    @Body() body: WhitelistAddress
  ): IPlainTransactionObject {
    return this.contractService.whitelistAddress(body);
  }

  // @Get('/whitelisted-addresses')
  // getWhiteListedAddresses(): string {
  //   return this.contractService.getWhiteListedAddresses();
  // }
}
