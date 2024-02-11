CREATE MIGRATION m1mcqyit3idziul6o56o7v2woaj5fy6drtckfyhtdfhde3y6c4sedq
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
  CREATE TYPE Integration::Api EXTENDING Integration::Base {
      CREATE REQUIRED PROPERTY api_token: std::str;
      CREATE REQUIRED PROPERTY api_url: std::str;
  };
  CREATE TYPE Integration::EmailPassword EXTENDING Integration::Base {
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE REQUIRED PROPERTY password_hash: std::str;
  };
  CREATE TYPE UserIntegration::Relation {
      CREATE REQUIRED LINK integration: Integration::Base;
      CREATE REQUIRED LINK user: User::Base;
      CREATE CONSTRAINT std::exclusive ON ((.user, .integration));
      CREATE INDEX ON (.user);
  };
  CREATE TYPE User::Account EXTENDING User::Base {
      CREATE REQUIRED PROPERTY first_name: std::str;
      CREATE REQUIRED PROPERTY last_name: std::str;
  };
};
