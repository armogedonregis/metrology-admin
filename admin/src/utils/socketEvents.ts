const socketEvents = {
    // crm message
    USERS_ONLINE: "users_online",
    ALL_CHAT: "all_chat",
    JOIN_CHAT: "join_chat",
    ALL_MESSAGE: "all_message",
    NEW_MESSAGE: "new_message",
    // site chat
    SUPPORT_ONLINE: "support_online",
    CLIENT_CONNECT: "client_connect",
    ALL_SUPPORT: "all_support",
    NEW_SUPPORT_CLIENT: "new_support_client",
    NEW_SUPPORT_MANAGER: "new_support_manager",
    CHAT_CLIENT: "chat_client",
    ALL_CLIENT: "all_client",
    CHAT_MANAGER: "chat_manager",
    // other events
    CONNECT_ERROR: "connect_error",
    SERVER_ERROR: "server_error",
}

export default socketEvents;