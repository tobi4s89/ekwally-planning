// GENERATED by @edgedb/generate v0.4.1

import * as $ from "../reflection";
import * as _ from "../imports";
import type * as _std from "./std";
import type * as _auth from "./ext/auth";
import type * as _UserIntegration from "./UserIntegration";
export type $BaseλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "identity": $.LinkDesc<_auth.$Identity, $.Cardinality.One, {}, true, false,  false, false>;
  "<user[is UserIntegration::Relation]": $.LinkDesc<_UserIntegration.$Relation, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Base = $.ObjectType<"User::Base", $BaseλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {identity: {__element__: _auth.$Identity, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Base = $.makeType<$Base>(_.spec, "77b27788-b184-11ee-b9b4-4f3ba5aca779", _.syntax.literal);

const Base: $.$expr_PathNode<$.TypeSet<$Base, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Base, $.Cardinality.Many), null);

export type $AccountλShape = $.typeutil.flatten<$BaseλShape & {
  "first_name": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "last_name": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
}>;
type $Account = $.ObjectType<"User::Account", $AccountλShape, null, [
  ...$Base['__exclusives__'],
]>;
const $Account = $.makeType<$Account>(_.spec, "77c75342-b184-11ee-93c6-918b52e4b9a2", _.syntax.literal);

const Account: $.$expr_PathNode<$.TypeSet<$Account, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Account, $.Cardinality.Many), null);

export type $currentUserλShape = $.typeutil.flatten<$BaseλShape & {
}>;
type $currentUser = $.ObjectType<"User::currentUser", $currentUserλShape, null, [
  ...$Base['__exclusives__'],
]>;
const $currentUser = $.makeType<$currentUser>(_.spec, "77b983ac-b184-11ee-bbd5-0f89841db3f5", _.syntax.literal);

const currentUser: $.$expr_PathNode<$.TypeSet<$currentUser, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($currentUser, $.Cardinality.Many), null);

const $User__globals: {  currentUser: _.syntax.$expr_Global<
              // "User::currentUser",
              $currentUser,
              $.Cardinality.Many
              >} = {  currentUser: _.syntax.makeGlobal(
              "User::currentUser",
              $.makeType(_.spec, "77b983ac-b184-11ee-bbd5-0f89841db3f5", _.syntax.literal),
              $.Cardinality.Many) as any};



export { $Base, Base, $Account, Account, $currentUser, currentUser };

type __defaultExports = {
  "Base": typeof Base;
  "Account": typeof Account;
  "currentUser": typeof currentUser;
  "global": typeof $User__globals
};
const __defaultExports: __defaultExports = {
  "Base": Base,
  "Account": Account,
  "currentUser": currentUser,
  "global": $User__globals
};
export default __defaultExports;
