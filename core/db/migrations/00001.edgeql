CREATE MIGRATION m1w2igqgmacvmczdnkbof4vvth7oovsb2hfjnozty2icknp473sr2q
    ONTO initial
{
  CREATE EXTENSION pgcrypto VERSION '1.3';
  CREATE EXTENSION auth VERSION '1.0';
  CREATE MODULE user IF NOT EXISTS;
  CREATE ABSTRACT TYPE user::User {
      CREATE REQUIRED LINK identity: ext::auth::Identity {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE GLOBAL user::currentUser := (SELECT
      user::User
  FILTER
      (.identity ?= GLOBAL ext::auth::ClientTokenIdentity)
  );
  CREATE TYPE user::Account EXTENDING user::User {
      CREATE REQUIRED PROPERTY first_name: std::str;
      CREATE REQUIRED PROPERTY last_name: std::str;
  };
};
