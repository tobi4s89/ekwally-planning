CREATE MIGRATION m1y73gbfcsifhn43sfmi65qtusotbqmej6l7yllj3kgkretrm7zzba
    ONTO m1w2igqgmacvmczdnkbof4vvth7oovsb2hfjnozty2icknp473sr2q
{
  CREATE MODULE integration IF NOT EXISTS;
  CREATE MODULE userIntegration IF NOT EXISTS;
  CREATE ABSTRACT TYPE integration::BaseIntegration {
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
  CREATE TYPE integration::PicnicIntegration EXTENDING integration::BaseIntegration {
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE REQUIRED PROPERTY password_hash: std::str;
  };
  CREATE TYPE integration::TrelloIntegration EXTENDING integration::BaseIntegration {
      CREATE REQUIRED PROPERTY api_key: std::str;
      CREATE REQUIRED PROPERTY api_token: std::str;
  };
  CREATE TYPE userIntegration::UserIntegration {
      CREATE LINK integration: integration::BaseIntegration;
      CREATE LINK user: user::User;
      CREATE CONSTRAINT std::exclusive ON ((.user, .integration));
      CREATE INDEX ON (.user);
  };
};
