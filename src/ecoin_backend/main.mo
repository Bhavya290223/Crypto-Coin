import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {
  var owner : Principal = Principal.fromText("ommkd-6zbsk-265a6-hsj4k-ia3ld-kh2c4-ht22c-ilexq-tnm77-r33qr-4ae");
  var totalSupply : Nat = 1000000000;
  var symbol : Text = "Saturn";

  private stable var entries: [(Principal, Nat)] = [];

  private var balances = HashMap.HashMap<Principal, Nat> (1, Principal.equal, Principal.hash);
  if (balances.size() < 1) {
    balances.put(owner, totalSupply);
  };

  public query func balanceOf(who: Principal): async Nat {
    
    let balance : Nat = switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };
    
    return balance;
  };

  public query func getSymbol(): async Text {
    return symbol;
  };
  
  public shared(msg) func payOut(): async Text {

    if (balances.get(msg.caller) == null) {
      let amount = 10000;
      let result = await transfer(msg.caller, amount);
      return result;
    } else {
      return "You got Bankrupt!";
    }

  };

  public shared(msg) func transfer(to: Principal, amount: Nat): async Text {
    let fromB = await balanceOf(msg.caller);
    let toB = await balanceOf(to);

    if (fromB > amount) {
      let newFromB: Nat = fromB - amount;
      balances.put(msg.caller, newFromB);

      let newToB: Nat = toB + amount;
      balances.put(to, newToB);

      return "Success";
    } else {
      return "Not enough funds available";
    }

  };

  system func preupgrade() {
    entries := Iter.toArray(balances.entries());
  };

   system func postupgrade() {
    balances := HashMap.fromIter<Principal, Nat> (entries.vals(), 1, Principal.equal, Principal.hash);
    if (balances.size() < 1) {
      balances.put(owner, totalSupply);
    }
  };
};
