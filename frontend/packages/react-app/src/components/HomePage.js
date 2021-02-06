import * as React from "react";
import { Button, Image, Link as AnchorLink, Main } from "./index";
import useWeb3Modal from "../hooks/useWeb3Modal";
import useCeramic from "../hooks/useCeramic";
import CommonHeader from "./CommonHeader";
import logo from "../ethereumLogo.png";
import { getDefaultProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { abis, addresses } from "@project/contracts";

// TODO just as sample. delete
async function readOnChainData() {
  // Should replace with the end-user wallet, e.g. Metamask
  const defaultProvider = getDefaultProvider();
  // Create an instance of an ethers.js Contract
  // Read more about ethers.js on https://docs.ethers.io/v5/api/contract/contract/
  const ceaErc20 = new Contract(
    addresses.ceaErc20,
    abis.erc20,
    defaultProvider
  );
  // A pre-defined address that owns some CEAERC20 tokens
  const tokenBalance = await ceaErc20.balanceOf(
    "0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C"
  );
  console.log({ tokenBalance: tokenBalance.toString() });
}

function HomePage() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const { ceramic, idx } = useCeramic(provider);
  console.log(ceramic, idx);

  return (
    <div>
      <CommonHeader
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
      />
      <Main>
        <Image src={logo} alt="react-logo" />
        <p>
          Edit <code>packages/react-app/src/App.js</code> and save to reload.
        </p>
        {/* Remove the "hidden" prop and open the JavaScript console in the browser to see what this function does */}
        <Button hidden onClick={() => readOnChainData()}>
          Read On-Chain Balance
        </Button>
        <AnchorLink
          href="https://ethereum.org/developers/#getting-started"
          style={{ marginTop: "8px" }}
        >
          Learn Ethereum
        </AnchorLink>
        <AnchorLink href="https://reactjs.org">Learn React</AnchorLink>
        <AnchorLink href="https://thegraph.com/docs/quick-start">
          Learn The Graph
        </AnchorLink>
      </Main>
    </div>
  );
}

export default HomePage;
