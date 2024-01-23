module UserIntegration {
    type Relation {
        link user: User::Base;
        link integration: Integration::Base;

        index on (.user);
        constraint exclusive on ((.user, .integration));
    };
}