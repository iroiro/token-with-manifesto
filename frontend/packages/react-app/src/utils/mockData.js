export const mockManifestoModel = {
  _id: "01ey0qpnvxq36dx42z2v9mswxw",
  creator_did:
    "did:3:kjzl6cwe1jw14a0fwom56w5kgoig5cofmasz1qb7s0jpwh6oi03jvo6kqdnagk2",
  manifesto_doc_commit_id:
    "bagcqcerarjhakj53gm7iorpbqw5zirpnidas2mwmgw2dja765dkoo4q5h35q",
  manifesto_doc_id:
    "kjzl6cwe1jw148pz7bxn79l4xdmuc2v288uvnljcr8se561tv7qdnuw1d9kqgor",
  witness_signatures: [
    {
      did:
        "did:3:kjzl6cwe1jw14a0fwom56w5kgoig5cofmasz1qb7s0jpwh6oi03jvo6kqdnagk2",
      signature:
        "0xc562fe37240b1b55e24ee1d2862b44da06b9899f8fa398e5…40df987b94b435d492d0422b5e7523716742c7bbff00a9f1b",
      wallet_address: "0x84d800DaE0Bdb31A4DE9918782bffCc8D041c1b8",
    },
    {
      did:
        "did:3:kjzl6cwe1jw14a0fwom56w5kgoig5cofmasz1qb7s0jpwh6oi03jvo6kqdnagk2",
      signature:
        "0xc562fe37240b1b55e24ee1d2862b44da06b9899f8fa398e5…40df987b94b435d492d0422b5e7523716742c7bbff00a9f1b",
      wallet_address: "0x84d800DaE0Bdb31A4DE9918782bffCc8D041c1b8",
    },
    {
      did:
        "did:3:kjzl6cwe1jw14a0fwom56w5kgoig5cofmasz1qb7s0jpwh6oi03jvo6kqdnagk2",
      signature:
        "0xc562fe37240b1b55e24ee1d2862b44da06b9899f8fa398e5…40df987b94b435d492d0422b5e7523716742c7bbff00a9f1b",
      wallet_address: "0x84d800DaE0Bdb31A4DE9918782bffCc8D041c1b8",
    },
  ],
};

export const mockCeramicDocResponse = {
  content: {
    manifestoCid: "QmSAdbek1DDb91BM8no29LeRxapusH72pmMZWs8zokGt6p",
    token: {
      decimals: 10,
      name: "token",
      symbol: "TKN",
      totalSupply: "1000000",
      deployedAddress: "0x395b393793d1d64f86891781297116512f108fee",
    },
  },
};

export const mockSubgraphResponse = {
  data: {
    token: {
      creator: "did:key:z6Mkw1Mpfejq2R76AsQo2qJoAVaF6HH5nLDoHrKrsW5Wdnei",
      decimals: 18,
      id: "0x395b393793d1d64f86891781297116512f108fee",
      name: "Sample03",
      symbol: "SMP3",
      totalSupply: "1000000000000000000",
      witnessDids: [
        "did:key:z6Mkw1Mpfejq2R76AsQo2qJoAVaF6HH5nLDoHrKrsW5Wdnei",
        "did:key:z6Mkw1Mpfejq2R76AsQo2qJoAVaF6HH5nLDoHrKrsW5Wdnei",
        "did:key:z6Mkw1Mpfejq2R76AsQo2qJoAVaF6HH5nLDoHrKrsW5Wdnei",
      ],
    },
  },
};

export const mockIdxBasicProfile = {
  name: "mock user",
  image: {
    original: {
      height: 400,
      mimeType: "image/jpeg",
      src: "ipfs://QmYwZt1CUvNfUrfF6xPEPKEhcURQTCVf81GY8tPDhHN5BV",
      width: 400,
    },
  },
};
