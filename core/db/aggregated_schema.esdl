module Integration {
    abstract type Base {
        required property name: str;
        required property is_active: bool {
            default := false;
        };
        required property created_at: datetime {
            default := datetime_current();
        };
        required property modified_at: datetime {
            default := datetime_current();
        };
    }

    type Api extending Base {
        required property api_url: str;
        required property api_token: str;
    };

    type EmailPassword extending Base {
        required property email: str;
        required property password_hash: str;
    };
}
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
module UserIntegration {
    type Relation {
        required link user: User::Base;
        required link integration: Integration::Base;

        index on (.user);
        constraint exclusive on ((.user, .integration));
    };
}
