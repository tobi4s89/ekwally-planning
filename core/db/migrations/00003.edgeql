CREATE MIGRATION m1a3zat6flwuv6l47gcojawzc5kamuafeu2udj6hvtdbz6ce7yfb7q
    ONTO m1mrppjptzg6vnd2ksy7flz5ru5bcpmqxbcc5ofqd43ohj3f4vpwqq
{
  ALTER TYPE UserIntegration::Relation {
      ALTER LINK integration {
          SET REQUIRED USING (<Integration::Base>{});
      };
      ALTER LINK user {
          SET REQUIRED USING (<User::Base>{});
      };
  };
};
