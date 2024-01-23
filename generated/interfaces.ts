// GENERATED by @edgedb/generate v0.4.1

import type * as edgedb from "edgedb";
export namespace std {
  export interface BaseObject {
    "id": string;
  }
  export interface $Object extends BaseObject {}
  export interface FreeObject extends BaseObject {}
  export type JsonEmpty = "ReturnEmpty" | "ReturnTarget" | "Error" | "UseNull" | "DeleteKey";
  export namespace enc {
    export type Base64Alphabet = "standard" | "urlsafe";
  }
}
export namespace Integration {
  export interface Base extends std.$Object {
    "created_at": Date;
    "is_active": boolean;
    "modified_at": Date;
    "name": string;
  }
  export interface Picnic extends Base {
    "email": string;
    "password_hash": string;
  }
  export interface Trello extends Base {
    "api_key": string;
    "api_token": string;
  }
}
export namespace User {
  export interface Base extends std.$Object {
    "identity": ext.auth.Identity;
  }
  export interface Account extends Base {
    "first_name": string;
    "last_name": string;
  }
  export interface currentUser extends Base {}
}
export namespace ext {
  export namespace auth {
    export interface ProviderConfig extends cfg.ConfigObject {
      "name": string;
    }
    export interface OAuthProviderConfig extends ProviderConfig {
      "name": string;
      "secret": string;
      "client_id": string;
      "display_name": string;
      "additional_scope"?: string | null;
    }
    export interface AppleOAuthProvider extends OAuthProviderConfig {
      "name": string;
      "display_name": string;
    }
    export interface Auditable extends std.$Object {
      "created_at": Date;
      "modified_at": Date;
    }
    export interface AuthConfig extends cfg.ExtensionConfig {
      "auth_signing_key"?: string | null;
      "token_time_to_live"?: edgedb.Duration | null;
      "allowed_redirect_urls": string[];
      "providers": ProviderConfig[];
      "ui"?: UIConfig | null;
    }
    export interface AzureOAuthProvider extends OAuthProviderConfig {
      "name": string;
      "display_name": string;
    }
    export interface Identity extends Auditable {
      "issuer": string;
      "subject": string;
    }
    export interface ClientTokenIdentity extends Identity {}
    export interface Factor extends Auditable {
      "identity": LocalIdentity;
    }
    export interface EmailFactor extends Factor {
      "email": string;
      "verified_at"?: Date | null;
    }
    export interface EmailPasswordFactor extends EmailFactor {
      "password_hash": string;
    }
    export interface EmailPasswordProviderConfig extends ProviderConfig {
      "name": string;
      "require_verification": boolean;
    }
    export type FlowType = "PKCE" | "Implicit";
    export interface GitHubOAuthProvider extends OAuthProviderConfig {
      "name": string;
      "display_name": string;
    }
    export interface GoogleOAuthProvider extends OAuthProviderConfig {
      "name": string;
      "display_name": string;
    }
    export type JWTAlgo = "RS256" | "HS256";
    export interface LocalIdentity extends Identity {
      "subject": string;
    }
    export interface PKCEChallenge extends Auditable {
      "challenge": string;
      "auth_token"?: string | null;
      "refresh_token"?: string | null;
      "identity"?: Identity | null;
    }
    export interface SMTPConfig extends cfg.ExtensionConfig {
      "sender"?: string | null;
      "host"?: string | null;
      "port"?: number | null;
      "username"?: string | null;
      "password"?: string | null;
      "security": SMTPSecurity;
      "validate_certs": boolean;
      "timeout_per_email": edgedb.Duration;
      "timeout_per_attempt": edgedb.Duration;
    }
    export type SMTPSecurity = "PlainText" | "TLS" | "STARTTLS" | "STARTTLSOrPlainText";
    export interface UIConfig extends cfg.ConfigObject {
      "redirect_to": string;
      "redirect_to_on_signup"?: string | null;
      "flow_type": FlowType;
      "app_name"?: string | null;
      "logo_url"?: string | null;
      "dark_logo_url"?: string | null;
      "brand_color"?: string | null;
    }
  }
}
export namespace UserIntegration {
  export interface Relation extends std.$Object {
    "integration"?: Integration.Base | null;
    "user"?: User.Base | null;
  }
}
export namespace cfg {
  export interface ConfigObject extends std.BaseObject {}
  export interface AbstractConfig extends ConfigObject {
    "query_work_mem"?: edgedb.ConfigMemory | null;
    "query_execution_timeout": edgedb.Duration;
    "session_idle_timeout": edgedb.Duration;
    "session_idle_transaction_timeout": edgedb.Duration;
    "listen_port": number;
    "listen_addresses": string[];
    "allow_dml_in_functions"?: boolean | null;
    "allow_bare_ddl"?: AllowBareDDL | null;
    "apply_access_policies"?: boolean | null;
    "allow_user_specified_id"?: boolean | null;
    "shared_buffers"?: edgedb.ConfigMemory | null;
    "maintenance_work_mem"?: edgedb.ConfigMemory | null;
    "effective_cache_size"?: edgedb.ConfigMemory | null;
    "effective_io_concurrency"?: number | null;
    "default_statistics_target"?: number | null;
    "force_database_error"?: string | null;
    "_pg_prepared_statement_cache_size": number;
    "extensions": ExtensionConfig[];
    "auth": Auth[];
  }
  export type AllowBareDDL = "AlwaysAllow" | "NeverAllow";
  export interface Auth extends ConfigObject {
    "priority": number;
    "user": string[];
    "comment"?: string | null;
    "method"?: AuthMethod | null;
  }
  export interface AuthMethod extends ConfigObject {
    "transports": ConnectionTransport[];
  }
  export interface Config extends AbstractConfig {}
  export type ConnectionTransport = "TCP" | "TCP_PG" | "HTTP" | "SIMPLE_HTTP";
  export interface DatabaseConfig extends AbstractConfig {}
  export interface ExtensionConfig extends ConfigObject {
    "cfg": AbstractConfig;
  }
  export interface InstanceConfig extends AbstractConfig {}
  export interface JWT extends AuthMethod {
    "transports": ConnectionTransport[];
  }
  export interface Password extends AuthMethod {
    "transports": ConnectionTransport[];
  }
  export interface SCRAM extends AuthMethod {
    "transports": ConnectionTransport[];
  }
  export interface Trust extends AuthMethod {}
}
export namespace fts {
  export type ElasticLanguage = "ara" | "bul" | "cat" | "ces" | "ckb" | "dan" | "deu" | "ell" | "eng" | "eus" | "fas" | "fin" | "fra" | "gle" | "glg" | "hin" | "hun" | "hye" | "ind" | "ita" | "lav" | "nld" | "nor" | "por" | "ron" | "rus" | "spa" | "swe" | "tha" | "tur" | "zho" | "edb_Brazilian" | "edb_ChineseJapaneseKorean";
  export type Language = "ara" | "hye" | "eus" | "cat" | "dan" | "nld" | "eng" | "fin" | "fra" | "deu" | "ell" | "hin" | "hun" | "ind" | "gle" | "ita" | "nor" | "por" | "ron" | "rus" | "spa" | "swe" | "tur";
  export type LuceneLanguage = "ara" | "ben" | "bul" | "cat" | "ces" | "ckb" | "dan" | "deu" | "ell" | "eng" | "est" | "eus" | "fas" | "fin" | "fra" | "gle" | "glg" | "hin" | "hun" | "hye" | "ind" | "ita" | "lav" | "lit" | "nld" | "nor" | "por" | "ron" | "rus" | "spa" | "srp" | "swe" | "tha" | "tur" | "edb_Brazilian" | "edb_ChineseJapaneseKorean" | "edb_Indian";
  export type PGLanguage = "xxx_simple" | "ara" | "hye" | "eus" | "cat" | "dan" | "nld" | "eng" | "fin" | "fra" | "deu" | "ell" | "hin" | "hun" | "ind" | "gle" | "ita" | "lit" | "npi" | "nor" | "por" | "ron" | "rus" | "srp" | "spa" | "swe" | "tam" | "tur" | "yid";
  export type Weight = "A" | "B" | "C" | "D";
}
export namespace schema {
  export type AccessKind = "Select" | "UpdateRead" | "UpdateWrite" | "Delete" | "Insert";
  export interface $Object extends std.BaseObject {
    "name": string;
    "internal": boolean;
    "builtin": boolean;
    "computed_fields"?: string[] | null;
  }
  export interface SubclassableObject extends $Object {
    "abstract"?: boolean | null;
    "is_abstract"?: boolean | null;
    "final": boolean;
    "is_final": boolean;
  }
  export interface InheritingObject extends SubclassableObject {
    "inherited_fields"?: string[] | null;
    "bases": InheritingObject[];
    "ancestors": InheritingObject[];
  }
  export interface AnnotationSubject extends $Object {
    "annotations": Annotation[];
  }
  export interface AccessPolicy extends InheritingObject, AnnotationSubject {
    "access_kinds": AccessKind[];
    "condition"?: string | null;
    "action": AccessPolicyAction;
    "expr"?: string | null;
    "errmessage"?: string | null;
    "subject": ObjectType;
  }
  export type AccessPolicyAction = "Allow" | "Deny";
  export interface Alias extends AnnotationSubject {
    "expr": string;
    "type"?: Type | null;
  }
  export interface Annotation extends InheritingObject, AnnotationSubject {
    "inheritable"?: boolean | null;
  }
  export interface Type extends SubclassableObject, AnnotationSubject {
    "expr"?: string | null;
    "from_alias"?: boolean | null;
    "is_from_alias"?: boolean | null;
  }
  export interface PrimitiveType extends Type {}
  export interface CollectionType extends PrimitiveType {}
  export interface Array extends CollectionType {
    "dimensions"?: number[] | null;
    "element_type": Type;
  }
  export interface ArrayExprAlias extends Array {}
  export interface CallableObject extends AnnotationSubject {
    "return_typemod"?: TypeModifier | null;
    "params": Parameter[];
    "return_type"?: Type | null;
  }
  export type Cardinality = "One" | "Many";
  export interface VolatilitySubject extends $Object {
    "volatility"?: Volatility | null;
  }
  export interface Cast extends AnnotationSubject, VolatilitySubject {
    "allow_implicit"?: boolean | null;
    "allow_assignment"?: boolean | null;
    "from_type"?: Type | null;
    "to_type"?: Type | null;
  }
  export interface ConsistencySubject extends InheritingObject, AnnotationSubject {
    "constraints": Constraint[];
  }
  export interface Constraint extends CallableObject, InheritingObject {
    "expr"?: string | null;
    "subjectexpr"?: string | null;
    "finalexpr"?: string | null;
    "errmessage"?: string | null;
    "delegated"?: boolean | null;
    "except_expr"?: string | null;
    "subject"?: ConsistencySubject | null;
    "params": Parameter[];
  }
  export interface Delta extends $Object {
    "parents": Delta[];
  }
  export interface Extension extends AnnotationSubject, $Object {
    "package": sys.ExtensionPackage;
  }
  export interface Function extends CallableObject, VolatilitySubject {
    "preserves_optionality"?: boolean | null;
    "body"?: string | null;
    "language": string;
    "used_globals": Global[];
  }
  export interface FutureBehavior extends $Object {}
  export interface Global extends AnnotationSubject {
    "required"?: boolean | null;
    "cardinality"?: Cardinality | null;
    "expr"?: string | null;
    "default"?: string | null;
    "target"?: Type | null;
  }
  export interface Index extends InheritingObject, AnnotationSubject {
    "kwargs"?: {name: string, expr: string}[] | null;
    "expr"?: string | null;
    "except_expr"?: string | null;
    "params": Parameter[];
  }
  export interface Pointer extends ConsistencySubject, AnnotationSubject {
    "cardinality"?: Cardinality | null;
    "required"?: boolean | null;
    "readonly"?: boolean | null;
    "default"?: string | null;
    "expr"?: string | null;
    "source"?: Source | null;
    "target"?: Type | null;
    "rewrites": Rewrite[];
  }
  export interface Source extends $Object {
    "pointers": Pointer[];
    "indexes": Index[];
  }
  export interface Link extends Pointer, Source {
    "on_target_delete"?: TargetDeleteAction | null;
    "on_source_delete"?: SourceDeleteAction | null;
    "target"?: ObjectType | null;
    "properties": Property[];
  }
  export interface Migration extends AnnotationSubject, $Object {
    "script": string;
    "message"?: string | null;
    "generated_by"?: MigrationGeneratedBy | null;
    "parents": Migration[];
  }
  export type MigrationGeneratedBy = "DevMode" | "DDLStatement";
  export interface Module extends AnnotationSubject, $Object {}
  export interface MultiRange extends CollectionType {
    "element_type": Type;
  }
  export interface MultiRangeExprAlias extends MultiRange {}
  export interface ObjectType extends Source, ConsistencySubject, InheritingObject, Type, AnnotationSubject {
    "compound_type": boolean;
    "is_compound_type": boolean;
    "union_of": ObjectType[];
    "intersection_of": ObjectType[];
    "properties": Property[];
    "links": Link[];
    "access_policies": AccessPolicy[];
    "triggers": Trigger[];
  }
  export interface Operator extends CallableObject, VolatilitySubject {
    "operator_kind"?: OperatorKind | null;
    "is_abstract"?: boolean | null;
    "abstract"?: boolean | null;
  }
  export type OperatorKind = "Infix" | "Postfix" | "Prefix" | "Ternary";
  export interface Parameter extends $Object {
    "typemod": TypeModifier;
    "kind": ParameterKind;
    "num": number;
    "default"?: string | null;
    "type": Type;
  }
  export type ParameterKind = "VariadicParam" | "NamedOnlyParam" | "PositionalParam";
  export interface Property extends Pointer {}
  export interface PseudoType extends InheritingObject, Type {}
  export interface Range extends CollectionType {
    "element_type": Type;
  }
  export interface RangeExprAlias extends Range {}
  export interface Rewrite extends InheritingObject, AnnotationSubject {
    "kind": TriggerKind;
    "expr": string;
    "subject": Pointer;
  }
  export type RewriteKind = "Update" | "Insert";
  export interface ScalarType extends PrimitiveType, ConsistencySubject, AnnotationSubject {
    "default"?: string | null;
    "enum_values"?: string[] | null;
    "arg_values"?: string[] | null;
  }
  export type SourceDeleteAction = "DeleteTarget" | "Allow" | "DeleteTargetIfOrphan";
  export type TargetDeleteAction = "Restrict" | "DeleteSource" | "Allow" | "DeferredRestrict";
  export interface Trigger extends InheritingObject, AnnotationSubject {
    "timing": TriggerTiming;
    "kinds": TriggerKind[];
    "scope": TriggerScope;
    "expr"?: string | null;
    "condition"?: string | null;
    "subject": ObjectType;
  }
  export type TriggerKind = "Update" | "Delete" | "Insert";
  export type TriggerScope = "All" | "Each";
  export type TriggerTiming = "After" | "AfterCommitOf";
  export interface Tuple extends CollectionType {
    "named": boolean;
    "element_types": TupleElement[];
  }
  export interface TupleElement extends std.BaseObject {
    "name"?: string | null;
    "type": Type;
  }
  export interface TupleExprAlias extends Tuple {}
  export type TypeModifier = "SetOfType" | "OptionalType" | "SingletonType";
  export type Volatility = "Immutable" | "Stable" | "Volatile";
}
export namespace sys {
  export interface SystemObject extends schema.$Object {}
  export interface ExternalObject extends SystemObject {}
  export interface Database extends ExternalObject, schema.AnnotationSubject {
    "name": string;
  }
  export interface ExtensionPackage extends SystemObject, schema.AnnotationSubject {
    "script": string;
    "version": {major: number, minor: number, stage: VersionStage, stage_no: number, local: string[]};
  }
  export interface Role extends SystemObject, schema.InheritingObject, schema.AnnotationSubject {
    "name": string;
    "superuser": boolean;
    "is_superuser": boolean;
    "password"?: string | null;
    "member_of": Role[];
  }
  export type TransactionIsolation = "RepeatableRead" | "Serializable";
  export type VersionStage = "dev" | "alpha" | "beta" | "rc" | "final";
}
export interface types {
  "std": {
    "BaseObject": std.BaseObject;
    "Object": std.$Object;
    "FreeObject": std.FreeObject;
    "JsonEmpty": std.JsonEmpty;
    "enc": {
      "Base64Alphabet": std.enc.Base64Alphabet;
    };
  };
  "Integration": {
    "Base": Integration.Base;
    "Picnic": Integration.Picnic;
    "Trello": Integration.Trello;
  };
  "User": {
    "Base": User.Base;
    "Account": User.Account;
    "currentUser": User.currentUser;
  };
  "ext": {
    "auth": {
      "ProviderConfig": ext.auth.ProviderConfig;
      "OAuthProviderConfig": ext.auth.OAuthProviderConfig;
      "AppleOAuthProvider": ext.auth.AppleOAuthProvider;
      "Auditable": ext.auth.Auditable;
      "AuthConfig": ext.auth.AuthConfig;
      "AzureOAuthProvider": ext.auth.AzureOAuthProvider;
      "Identity": ext.auth.Identity;
      "ClientTokenIdentity": ext.auth.ClientTokenIdentity;
      "Factor": ext.auth.Factor;
      "EmailFactor": ext.auth.EmailFactor;
      "EmailPasswordFactor": ext.auth.EmailPasswordFactor;
      "EmailPasswordProviderConfig": ext.auth.EmailPasswordProviderConfig;
      "FlowType": ext.auth.FlowType;
      "GitHubOAuthProvider": ext.auth.GitHubOAuthProvider;
      "GoogleOAuthProvider": ext.auth.GoogleOAuthProvider;
      "JWTAlgo": ext.auth.JWTAlgo;
      "LocalIdentity": ext.auth.LocalIdentity;
      "PKCEChallenge": ext.auth.PKCEChallenge;
      "SMTPConfig": ext.auth.SMTPConfig;
      "SMTPSecurity": ext.auth.SMTPSecurity;
      "UIConfig": ext.auth.UIConfig;
    };
  };
  "UserIntegration": {
    "Relation": UserIntegration.Relation;
  };
  "cfg": {
    "ConfigObject": cfg.ConfigObject;
    "AbstractConfig": cfg.AbstractConfig;
    "AllowBareDDL": cfg.AllowBareDDL;
    "Auth": cfg.Auth;
    "AuthMethod": cfg.AuthMethod;
    "Config": cfg.Config;
    "ConnectionTransport": cfg.ConnectionTransport;
    "DatabaseConfig": cfg.DatabaseConfig;
    "ExtensionConfig": cfg.ExtensionConfig;
    "InstanceConfig": cfg.InstanceConfig;
    "JWT": cfg.JWT;
    "Password": cfg.Password;
    "SCRAM": cfg.SCRAM;
    "Trust": cfg.Trust;
  };
  "fts": {
    "ElasticLanguage": fts.ElasticLanguage;
    "Language": fts.Language;
    "LuceneLanguage": fts.LuceneLanguage;
    "PGLanguage": fts.PGLanguage;
    "Weight": fts.Weight;
  };
  "schema": {
    "AccessKind": schema.AccessKind;
    "Object": schema.$Object;
    "SubclassableObject": schema.SubclassableObject;
    "InheritingObject": schema.InheritingObject;
    "AnnotationSubject": schema.AnnotationSubject;
    "AccessPolicy": schema.AccessPolicy;
    "AccessPolicyAction": schema.AccessPolicyAction;
    "Alias": schema.Alias;
    "Annotation": schema.Annotation;
    "Type": schema.Type;
    "PrimitiveType": schema.PrimitiveType;
    "CollectionType": schema.CollectionType;
    "Array": schema.Array;
    "ArrayExprAlias": schema.ArrayExprAlias;
    "CallableObject": schema.CallableObject;
    "Cardinality": schema.Cardinality;
    "VolatilitySubject": schema.VolatilitySubject;
    "Cast": schema.Cast;
    "ConsistencySubject": schema.ConsistencySubject;
    "Constraint": schema.Constraint;
    "Delta": schema.Delta;
    "Extension": schema.Extension;
    "Function": schema.Function;
    "FutureBehavior": schema.FutureBehavior;
    "Global": schema.Global;
    "Index": schema.Index;
    "Pointer": schema.Pointer;
    "Source": schema.Source;
    "Link": schema.Link;
    "Migration": schema.Migration;
    "MigrationGeneratedBy": schema.MigrationGeneratedBy;
    "Module": schema.Module;
    "MultiRange": schema.MultiRange;
    "MultiRangeExprAlias": schema.MultiRangeExprAlias;
    "ObjectType": schema.ObjectType;
    "Operator": schema.Operator;
    "OperatorKind": schema.OperatorKind;
    "Parameter": schema.Parameter;
    "ParameterKind": schema.ParameterKind;
    "Property": schema.Property;
    "PseudoType": schema.PseudoType;
    "Range": schema.Range;
    "RangeExprAlias": schema.RangeExprAlias;
    "Rewrite": schema.Rewrite;
    "RewriteKind": schema.RewriteKind;
    "ScalarType": schema.ScalarType;
    "SourceDeleteAction": schema.SourceDeleteAction;
    "TargetDeleteAction": schema.TargetDeleteAction;
    "Trigger": schema.Trigger;
    "TriggerKind": schema.TriggerKind;
    "TriggerScope": schema.TriggerScope;
    "TriggerTiming": schema.TriggerTiming;
    "Tuple": schema.Tuple;
    "TupleElement": schema.TupleElement;
    "TupleExprAlias": schema.TupleExprAlias;
    "TypeModifier": schema.TypeModifier;
    "Volatility": schema.Volatility;
  };
  "sys": {
    "SystemObject": sys.SystemObject;
    "ExternalObject": sys.ExternalObject;
    "Database": sys.Database;
    "ExtensionPackage": sys.ExtensionPackage;
    "Role": sys.Role;
    "TransactionIsolation": sys.TransactionIsolation;
    "VersionStage": sys.VersionStage;
  };
}


export namespace helper {
  type LinkType = std.BaseObject | std.BaseObject[];

  export type propertyKeys<T> = {
    [k in keyof T]: NonNullable<T[k]> extends LinkType ? never : k;
  }[keyof T];

  export type linkKeys<T> = {
    [k in keyof T]: NonNullable<T[k]> extends LinkType ? k : never;
  }[keyof T];

  export type Props<T> = Pick<T, propertyKeys<T>>;
  export type Links<T> = Pick<T, linkKeys<T>>;
}
