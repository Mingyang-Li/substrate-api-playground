import { BlockHash } from '@polkadot/types/interfaces';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { AccountsStakingPayoutsService } from './services/accounts/AccountsStakingPayoutsService';

async function main () {
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });

    const blockhash = await api.rpc.chain.getBlockHash(5639853);
    const currentEra = await api.query.

    const payOutService = new AccountsStakingPayoutsService(api);
    const data = {
        hash: blockhash,
        address: "081c5466574f932ef5e1469e984d5d39ad5946468f0ab9d06c454f74cfc2f16c",
        depth: 80,
        era: 386,
        unclaimedOnly: true,
        currentEra: 386
    };
    const payOutData = payOutService.fetchAccountStakingPayout(
        data.hash,
        data.address,
        data.depth,
        data.era,
        data.unclaimedOnly,
        data.currentEra
    )
    console.table(payOutData);
}
  
main().catch((error) => {
    console.error(error);
    process.exit(-1);
});