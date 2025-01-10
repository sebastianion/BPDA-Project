import { Injectable } from '@nestjs/common';
import { NftAcademic } from './nftAcademic';
import { Address } from '@multiversx/sdk-core/out';

@Injectable()
export class ContractService {

  private readonly nftAcademicContract: NftAcademic = new NftAcademic();

  constructor(){}

  enrollInstitution(): string {
    throw new Error('Method not implemented.');
  }
  async getEnrolledInstitution(address: string) {
    return await this.nftAcademicContract.getEnrolledInstitutions({address: Address.fromBech32(address)})
  }

  async getEnrollmentFee() {
   return await this.nftAcademicContract.getEnrollmentFee();
  }

  whitelistAddress(): string {
    throw new Error('Method not implemented.');
  }
  getWhiteListedAddresses(): string {
    throw new Error('Method not implemented.');
  }
}
