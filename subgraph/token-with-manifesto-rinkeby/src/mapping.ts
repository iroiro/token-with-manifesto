import { BigInt } from "@graphprotocol/graph-ts";
import {
  TokenFactory,
  CreateToken,
} from "../generated/TokenFactory/TokenFactory";
import { TokenWithManifesto } from "../generated/TokenFactory/TokenWithManifesto";
import { Token } from "../generated/schema";

export function handleCreateToken(event: CreateToken): void {
  let entity = Token.load(event.transaction.from.toHex());
  if (entity == null) {
    entity = new Token(event.transaction.from.toHex());
    entity.id = event.params.token.toHex();

    let TWM = TokenWithManifesto.bind(event.params.token);

    let name = TWM.try_name();
    if (!name.reverted) {
      entity.name = name.value;
    }

    let symbol = TWM.try_symbol();
    if (!symbol.reverted) {
      entity.symbol = symbol.value;
    }

    let decimals = TWM.try_decimals();
    if (!decimals.reverted) {
      entity.decimals = decimals.value;
    }

    let totalSupply = TWM.try_totalSupply();
    if (!totalSupply.reverted) {
      entity.totalSupply = totalSupply.value;
    }
    entity.creator = event.params.creator;
    entity.witnessDids = event.params.witnessDids;
  }
  entity.save();
}
