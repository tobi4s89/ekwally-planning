using extension auth;

module User {
    global currentUser := (
        select Base
        filter .identity ?= global ext::auth::ClientTokenIdentity
    );

    abstract type Base {
        required identity: ext::auth::Identity {
            constraint exclusive;
        };
    };

    type Account extending Base {
        required first_name: str;
        required last_name: str;
    };
}