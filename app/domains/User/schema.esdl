using extension auth;

module user {
    global currentUser := (
        select User
        filter .identity ?= global ext::auth::ClientTokenIdentity
    );

    abstract type User {
        required identity: ext::auth::Identity {
            constraint exclusive;
        };
    };

    type Account extending User {
        required first_name: str;
        required last_name: str;
    };
}