CREATE MIGRATION m1mrppjptzg6vnd2ksy7flz5ru5bcpmqxbcc5ofqd43ohj3f4vpwqq
    ONTO m1eqwuvgziadrcbkvjpkcso5c6hgbyuvrjeybew7t7p34vnanu3eka
{
  ALTER TYPE Integration::Picnic RENAME TO Integration::EmailPassword;
  ALTER TYPE Integration::Trello RENAME TO Integration::Api;
};
