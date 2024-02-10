module UserIntegration {
    type Relation {
        required link user: User::Base;
        required link integration: Integration::Base;

        index on (.user);
        constraint exclusive on ((.user, .integration));
    };
}