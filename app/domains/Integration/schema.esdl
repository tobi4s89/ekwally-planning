module integration {
    abstract type BaseIntegration {
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

    type TrelloIntegration extending BaseIntegration {
        required property api_key: str;
        required property api_token: str;
    };

    type PicnicIntegration extending BaseIntegration {
        required property email: str;
        required property password_hash: str;
    };
}