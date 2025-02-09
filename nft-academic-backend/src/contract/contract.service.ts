import { Injectable } from '@nestjs/common';
import { NftAcademic } from './nftAcademic';
import { Address, IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { EnrollInstitution, WhitelistAddress } from './entities';

@Injectable()
export class ContractService {

  private readonly nftAcademicContract: NftAcademic = new NftAcademic();

  constructor(){}

  enrollInstitution(body: EnrollInstitution): IPlainTransactionObject {
    return this.nftAcademicContract.enrollInstitution({
      name: body.name,
      nativeTransferAmount: body.amount,
      tokenTransfers: [],
    })
  }
  async getEnrolledInstitution(address: string) {
    const response = await this.nftAcademicContract.getEnrolledInstitutions({address})
    const decodedresponse = {address: response[0].address.toString() ?? 'error', name: response[0].name?.toString() ?? 'error'};
    return decodedresponse;
  }

  async getEnrollmentFee() {
   return await this.nftAcademicContract.getEnrollmentFee();
  }

  whitelistAddress(body: WhitelistAddress): IPlainTransactionObject {
    return this.nftAcademicContract.whitelistAddress({name: body.name, address: body.address});
  }
  getWhiteListedAddresses(): string {
    throw new Error('Method not implemented.');
  }
}
