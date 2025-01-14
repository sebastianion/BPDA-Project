import { IPlainTransactionObject, SmartContractTransactionsFactory } from "@multiversx/sdk-core";
import { TransactionsFactoryConfig } from "@multiversx/sdk-core";
import { Address } from "@multiversx/sdk-core";
import { AbiRegistry } from "@multiversx/sdk-core";
import { ApiNetworkProvider } from "@multiversx/sdk-network-providers";
import { QueryRunnerAdapter } from "@multiversx/sdk-core";
import { SmartContractQueriesController } from "@multiversx/sdk-core";
import { TokenTransfer } from "@multiversx/sdk-core";
import { Transaction } from "@multiversx/sdk-core";

export class NftAcademic {
    private readonly factory: SmartContractTransactionsFactory;
    private readonly abi: AbiRegistry;
    private readonly contractAddress: Address;
    private readonly queryController: SmartContractQueriesController;

    constructor() {
        const plainAbi: any = {
            buildInfo: {
                rustc: {
                    version: "1.81.0",
                    commitHash: "eeb90cda1969383f56a2637cbd3037bdf598841c",
                    commitDate: "2024-09-04",
                    channel: "Stable",
                    short: "rustc 1.81.0 (eeb90cda1 2024-09-04)",
                },
                contractCrate: { name: "nft-academic", version: "0.0.0" },
                framework: { name: "multiversx-sc", version: "0.53.2" },
            },
            name: "NftAcademic",
            constructor: { inputs: [{ name: "enrollment_fee", type: "BigUint" }], outputs: [] },
            upgradeConstructor: { inputs: [{ name: "enrollment_fee", type: "BigUint" }], outputs: [] },
            endpoints: [
                {
                    name: "enrollInstitution",
                    mutability: "mutable",
                    payableInTokens: ["EGLD"],
                    inputs: [{ name: "name", type: "bytes" }],
                    outputs: [],
                    onlyOwner: false,
                },
                {
                    name: "whitelistAddress",
                    onlyOwner: true,
                    mutability: "mutable",
                    inputs: [{ name: "name", type: "bytes" }],
                    outputs: [],
                    payableInTokens: [],
                },
                {
                    name: "getEnrolledInstitutions",
                    mutability: "readonly",
                    inputs: [{ name: "address", type: "Address" }],
                    outputs: [{ type: "Institution" }],
                    onlyOwner: false,
                    payableInTokens: [],
                },
                {
                    name: "getEnrollmentFee",
                    mutability: "readonly",
                    inputs: [],
                    outputs: [{ type: "BigUint" }],
                    onlyOwner: false,
                    payableInTokens: [],
                },
            ],
            esdtAttributes: [],
            hasCallback: false,
            types: {
                Institution: {
                    type: "struct",
                    fields: [
                        { name: "address", type: "Address" },
                        { name: "name", type: "bytes" },
                    ],
                },
            },
        };
        this.abi = AbiRegistry.create(plainAbi);
        const config = new TransactionsFactoryConfig({ chainID: "D" });
        this.factory = new SmartContractTransactionsFactory({ config: config, abi: this.abi });
        this.contractAddress = Address.fromBech32("erd1qqqqqqqqqqqqqpgqryqcqw8aeewzhqy6u0flvj6wmaplw4ua7jxswf4d04");

        const api = new ApiNetworkProvider("https://devnet-api.multiversx.com");
        const queryRunner = new QueryRunnerAdapter({ networkProvider: api });
        this.queryController = new SmartContractQueriesController({ abi: this.abi, queryRunner: queryRunner });
    }

    enrollInstitution(options: {
        name: string;
        nativeTransferAmount?: bigint;
        tokenTransfers?: TokenTransfer[];
    }): IPlainTransactionObject {
        let args: any[] = [];

        args.push(options.name);

        const tx = this.factory.createTransactionForExecute({
            sender: Address.empty(),
            contract: this.contractAddress,
            function: "enrollInstitution",
            gasLimit: 100000000n,
            arguments: args,
            nativeTransferAmount: options.nativeTransferAmount,
            tokenTransfers: options.tokenTransfers,
        });

        return tx.toPlainObject();
    }

    whitelistAddress(options: { name: string }): IPlainTransactionObject {
        let args: any[] = [];

        args.push(options.name);

        const tx = this.factory.createTransactionForExecute({
            sender: Address.empty(),
            contract: this.contractAddress,
            function: "whitelistAddress",
            gasLimit: 100000000n,
            arguments: args,
        });

        return tx.toPlainObject();
    }

    /**
     *This is a view method. This will run a vm-query.
     */
    async getEnrolledInstitutions(options: { address: Address }): Promise<any[]> {
        let args: any[] = [];

        args.push(options.address);

        const query = this.queryController.createQuery({
            contract: this.contractAddress.toBech32(),
            function: "getEnrolledInstitutions",
            arguments: args,
        });

        const response = await this.queryController.runQuery(query);
        return this.queryController.parseQueryResponse(response);
    }

    /**
     *This is a view method. This will run a vm-query.
     */
    async getEnrollmentFee(): Promise<any[]> {
        let args: any[] = [];

        const query = this.queryController.createQuery({
            contract: this.contractAddress.toBech32(),
            function: "getEnrollmentFee",
            arguments: args,
        });

        const response = await this.queryController.runQuery(query);
        return this.queryController.parseQueryResponse(response);
    }
}
