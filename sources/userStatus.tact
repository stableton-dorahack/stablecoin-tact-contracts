import "@stdlib/deploy";


message SetMessageMsg {
    message: String;
}


contract UserStatusContract with Deployable {

    owner: Address;
    message: String;

    init(owner: Address) {
        self.owner = owner;
    }


    fun setMessage(message: SetMessageMsg) {
        let ctx: Context = context();
        // todo add writing access check
        // by gatekeeper?
        require(ctx.sender == self.owner, "Invalid sender");
        self.message = message.message;
    }

    receive(msg: SetMessageMsg) {
        self.setMessage(SetMessageMsg{
            message: msg.message
        });
    }


    get fun message(): String {
        return self.message;
    }

}