use multiversx_sc_scenario::*;

fn world() -> ScenarioWorld {
    let mut blockchain = ScenarioWorld::new();

    blockchain.register_contract("mxsc:output/nft-academic.mxsc.json", nft_academic::ContractBuilder);
    blockchain
}

#[test]
fn empty_rs() {
    world().run("scenarios/nft_academic.scen.json");
}
