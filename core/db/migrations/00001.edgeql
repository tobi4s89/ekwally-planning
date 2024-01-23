CREATE MIGRATION m1eqwuvgziadrcbkvjpkcso5c6hgbyuvrjeybew7t7p34vnanu3eka
    ONTO initial
{
  CREATE EXTENSION pgcrypto VERSION '1.3';
  CREATE EXTENSION auth VERSION '1.0';
  CREATE MODULE Integration IF NOT EXISTS;
  CREATE MODULE User IF NOT EXISTS;
  CREATE MODULE UserIntegration IF NOT EXISTS;
  CREATE ABSTRACT TYPE User::Base {
      CREATE REQUIRED LINK identity: ext::auth::Identity {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE GLOBAL User::currentUser := (SELECT
      User::Base
  FILTER
      (.identity ?= GLOBAL ext::auth::ClientTokenIdentity)
  );
  CREATE ABSTRACT TYPE Integration::Base {
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY is_active: std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY modified_at: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE Integration::Picnic EXTENDING Integration::Base {
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE REQUIRED PROPERTY password_hash: std::str;
  };
  CREATE TYPE Integration::Trello EXTENDING Integration::Base {
      CREATE REQUIRED PROPERTY api_key: std::str;
      CREATE REQUIRED PROPERTY api_token: std::str;
  };
  CREATE TYPE UserIntegration::Relation {
      CREATE LINK integration: Integration::Base;
      CREATE LINK user: User::Base;
      CREATE CONSTRAINT std::exclusive ON ((.user, .integration));
      CREATE INDEX ON (.user);
  };
  CREATE TYPE User::Account EXTENDING User::Base {
      CREATE REQUIRED PROPERTY first_name: std::str;
      CREATE REQUIRED PROPERTY last_name: std::str;
  };
};
