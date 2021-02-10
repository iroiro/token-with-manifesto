import { BigInt } from "@graphprotocol/graph-ts";
import { CreateToken } from "../generated/TokenFactory/TokenFactory";
import { TokenWithManifesto } from "../generated/TokenFactory/TokenWithManifesto";
import { Token, Account, AccountToken } from "../generated/schema";
import { TokenWithManifesto as TokenWithManifestoTemplate } from "../generated/templates";
import { Transfer } from "../generated/templates/TokenWithManifesto/TokenWithManifesto";

export function handleCreateToken(event: CreateToken): void {
  let token = Token.load(event.transaction.from.toHex());
  if (token == null) {
    token = new Token(event.transaction.from.toHex());
  }

  let TWM = TokenWithManifesto.bind(event.params.token);
  token.id = event.params.token.toHex();

  let name = TWM.try_name();
  if (!name.reverted) {
    token.name = name.value;
  }

  let symbol = TWM.try_symbol();
  if (!symbol.reverted) {
    token.symbol = symbol.value;
  }

  let decimals = TWM.try_decimals();
  if (!decimals.reverted) {
    token.decimals = decimals.value;
  }

  let totalSupply = TWM.try_totalSupply();
  if (!totalSupply.reverted) {
    token.totalSupply = totalSupply.value;
  }

  token.creator = event.params.creator;
  token.witnessDids = event.params.witnessDids;
  token.accountTokens = [];
  token.save();

  TokenWithManifestoTemplate.create(event.params.token);
}

export function handleTransfer(event: Transfer): void {
  let tokenId = event.address.toHex();
  let token = Token.load(tokenId);
  let fromAccount = Account.load(event.params.from.toHex());
  if (fromAccount == null) {
    fromAccount = new Account(event.params.from.toHex());
  }
  fromAccount.save();

  let toAccount = Account.load(event.params.to.toHex());
  if (toAccount == null) {
    toAccount = new Account(event.params.to.toHex());
  }
  toAccount.save();

  let fromAccountTokenId = event.params.from
    .toHexString()
    .concat("-")
    .concat(tokenId);
  let fromAccountToken = AccountToken.load(fromAccountTokenId);
  if (fromAccountToken == null) {
    fromAccountToken = new AccountToken(fromAccountTokenId);
    fromAccountToken.balance = BigInt.fromI32(0);
  }
  fromAccountToken.account = fromAccount.id;
  fromAccountToken.balance = fromAccountToken.balance.minus(event.params.value);
  fromAccountToken.save();

  let toAccountTokenId = event.params.to
    .toHexString()
    .concat("-")
    .concat(tokenId);
  let toAccountToken = AccountToken.load(toAccountTokenId);
  if (toAccountToken == null) {
    toAccountToken = new AccountToken(toAccountTokenId);
    toAccountToken.balance = BigInt.fromI32(0);
  }
  toAccountToken.account = toAccount.id;
  toAccountToken.balance = toAccountToken.balance.plus(event.params.value);
  toAccountToken.save();

  let tmpAccountsTokens = token.accountTokens;
  if (!tmpAccountsTokens.includes(fromAccountTokenId)) {
    tmpAccountsTokens.push(fromAccountTokenId);
  }
  if (!tmpAccountsTokens.includes(toAccountTokenId)) {
    tmpAccountsTokens.push(toAccountTokenId);
  }
  token.accountTokens = tmpAccountsTokens;

  token.save();
}
