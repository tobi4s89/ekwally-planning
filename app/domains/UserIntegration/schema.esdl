module userIntegration {
    type UserIntegration {
        link user: user::User;
        link integration: integration::BaseIntegration;

        index on (.user);
        constraint exclusive on ((.user, .integration));
    }
}