#![no_std]

#[allow(unused_imports)]
use multiversx_sc::imports::*;
use multiversx_sc::derive_imports::*;


#[type_abi]
#[derive(TopEncode, TopDecode, NestedEncode, NestedDecode, Clone, Debug)]
pub struct Institution<M: ManagedTypeApi> {
    pub address: ManagedAddress<M>,
    pub name: ManagedBuffer<M>,
}

#[multiversx_sc::contract]
pub trait NftAcademic {
    #[init]
    fn init(&self, enrollment_fee: BigUint) {
        self.enrollment_fee().set(enrollment_fee);
    }

    #[upgrade]
    fn upgrade(&self, enrollment_fee: BigUint) {
        self.enrollment_fee().set(enrollment_fee);
    }

    #[payable("EGLD")]
    #[endpoint(enrollInstitution)]
    fn enroll_institution(&self, name: &ManagedBuffer) {
        let caller = self.blockchain().get_caller();
        let payment_amount = self.call_value().egld_value().clone_value();
        require!(
            payment_amount > self.enrollment_fee().get(),
            "Registration fee is incorrect; please check and try again"
        );

        require!(
            !self.whitelisted_addresses(&caller).is_empty(),
            "Address was not verified yet !"
        );

        let instituiton_mapper = self.enrolled_institutions(&caller);

        require!(
            instituiton_mapper.is_empty(),
            "Institution already exists for this address and name"
        );

        let institution = Institution {
            address: caller.clone(),
            name: name.clone()
        };

        instituiton_mapper.set(institution);
    }

    #[only_owner]
    #[endpoint(whitelistAddress)]
    fn whitelist_address(&self, name: &ManagedBuffer) {
        let caller = self.blockchain().get_caller();

        let whitelist_mapper = self.whitelisted_addresses(&caller);
        require!(
            whitelist_mapper.is_empty(),
            "Address was already whitelisted"
        );

        let institution = Institution {
            address: caller.clone(),
            name: name.clone()
        };

        whitelist_mapper.set(institution);
    }

    #[storage_mapper("whitelistedAddresses")]
    fn whitelisted_addresses(
        &self, 
        address: &ManagedAddress,
        ) -> SingleValueMapper<Institution<Self::Api>>;

    #[view(getEnrolledInstitutions)]
    #[storage_mapper("enrolledInstitutions")]
    fn enrolled_institutions(
        &self, 
        address: &ManagedAddress,
        ) -> SingleValueMapper<Institution<Self::Api>>;
    

    #[view(getEnrollmentFee)]
    #[storage_mapper("enrollment_fee")]
    fn enrollment_fee(&self) -> SingleValueMapper<BigUint>;
}
